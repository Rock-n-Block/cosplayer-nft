import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { useTypedDispatch, useTypedSelector } from 'store';
import { UserSlice } from 'store/user/reducer';

import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { providerOptions } from 'config';
import { logger } from 'utils';

import { ipDataApi, userApi } from 'services/api';
import WalletService, { TWalletService } from 'services/WalletService';
import { chainsEnum, IEventSubscriberCallbacks, IWalletContext, TAvailableProviders } from 'types';

declare global {
  interface Window {
    ethereum: any;
  }
}

const WalletConnectContext = createContext<IWalletContext>({} as IWalletContext);

const Connect: FC = ({ children }) => {
  const dispatch = useTypedDispatch();
  const { setAddress, setBalance, setIsLoading } = UserSlice.actions;
  const { address } = useTypedSelector((state) => state.UserReducer);

  const provider = useRef<TWalletService>(WalletService);
  const localToken = 'cosplayer_nft_token';
  const localProvider = 'cosplayer_nft_provider';

  const disconnect = useCallback(() => {
    localStorage.removeItem(localProvider);
    localStorage.removeItem(localToken);
    localStorage.removeItem('walletconnect');
    dispatch(setAddress(''));
    dispatch(setBalance('0'));
  }, [dispatch, setAddress, setBalance]);

  const getUserData = useCallback(
    async (providerName: TAvailableProviders, web3provider: TWalletService | Web3) => {
      let res: { address: string } | IConnect | IError = { address: '' };

      if (!(web3provider instanceof Web3)) {
        res = await web3provider.getAccount(address || '');
      } else {
        const accounts = await web3provider.eth.getAccounts();
        // eslint-disable-next-line prefer-destructuring
        res.address = accounts[0];
      }
      if ('address' in res) {
        if (!localStorage.getItem(localToken)) {
          const msg: any = await userApi.getMsg();
          const signedMsg = await provider.current.signMsg(providerName, res.address, msg.data);
          const login = await userApi.login({
            address: res.address,
            msg: msg.data,
            signedMsg,
          });
          localStorage[localToken] = login.data.key;
        }
        const balance = await provider.current.getBalance(res.address);
        dispatch(setAddress(res.address));
        dispatch(setBalance(balance.toString()));
        localStorage[localProvider] = providerName;
        const response = await ipDataApi.getIpData();
        logger('ip response', response);
        return userApi.getMe();
      }
      return undefined;
    },
    [address, dispatch, setAddress, setBalance],
  );

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: TAvailableProviders): Promise<boolean> => {
      dispatch(setIsLoading(true));
      if ((providerName === 'MetaMask' && window.ethereum) || providerName === 'WalletConnect') {
        try {
          const connected = await provider.current.initWalletConnect(chainName, providerName);
          if (connected) {
            try {
              const user = await getUserData(providerName, provider.current);
              logger('user', user);
              const callbacks: IEventSubscriberCallbacks = {
                success: [{ accountsChanged: () => getUserData(providerName, provider.current) }],
              };
              provider.current.eventSubscribe(callbacks);
              return true;
            } catch (err: any) {
              logger('Getting address or balance error', err, 'error');
              return false;
            }
          }
          return false;
        } catch (err: any) {
          logger('Ethereum', err, 'error');
          return false;
        }
      }
      if (providerName === 'TrustWallet') {
        try {
          const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions,
          });

          const web3Provider = await web3Modal.connect();
          await web3Modal.toggleModal();
          const newWeb3 = new Web3(web3Provider);
          await getUserData(providerName, newWeb3);
          const callbacks: IEventSubscriberCallbacks = {
            success: [{ accountsChanged: () => getUserData(providerName, newWeb3) }],
          };
          provider.current.eventSubscribe(callbacks);
          return true;
        } catch (e) {
          logger('TrustWallet connect', e);
          return false;
        }
      }
      dispatch(setIsLoading(false));
      return false;
    },
    [dispatch, getUserData, setIsLoading],
  );

  const WalletConnectValues = useMemo(
    () => ({
      connect,
      disconnect,
      walletService: provider.current,
    }),
    [connect, disconnect],
  );

  const firstConnection = useCallback(async () => {
    if (
      localStorage.getItem(localProvider) ||
      (localStorage[localProvider] === 'WalletConnect' && localStorage.getItem('walletconnect'))
    ) {
      await connect(
        provider.current.getCurrentChain(),
        localStorage[localProvider] as TAvailableProviders,
      );
    }
  }, [connect]);

  useEffect(() => {
    firstConnection();
  }, [firstConnection]);

  return (
    <WalletConnectContext.Provider value={WalletConnectValues}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export default Connect;

export const useWalletConnectorContext = () => {
  return useContext(WalletConnectContext);
};
