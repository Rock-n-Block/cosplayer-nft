import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { useTypedDispatch, useTypedSelector } from 'store';
import { UserSlice } from 'store/user/reducer';

import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { providerOptions } from 'config';
import { logger } from 'utils';

import useLocalStorage from 'hooks/useLocalStorage';
import { userApi } from 'services/api';
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
  const [localProviderName, setLocalProviderName] = useLocalStorage(`CosplayerNFT-provider`, '');
  const [localToken, setLocalToken] = useLocalStorage(`CosplayerNFT-token`, '');

  const disconnect = useCallback(() => {
    setLocalProviderName('');
    setLocalToken('');
    dispatch(setAddress(''));
    dispatch(setBalance('0'));
  }, [dispatch, setAddress, setBalance, setLocalProviderName, setLocalToken]);

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
        if (!localToken) {
          const msg: any = await userApi.getMsg();
          const signedMsg = await provider.current.signMsg(providerName, res.address, msg.data);
          const login = await userApi.login({
            address: res.address,
            msg: msg.data,
            signedMsg,
          });
          setLocalToken(login.data.key);
        }
        const balance = await provider.current.getBalance(res.address);
        dispatch(setAddress(res.address));
        dispatch(setBalance(balance.toString()));
        setLocalProviderName(providerName);
      }
    },
    [address, dispatch, localToken, setAddress, setBalance, setLocalProviderName, setLocalToken],
  );

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: TAvailableProviders) => {
      dispatch(setIsLoading(true));
      if ((providerName === 'MetaMask' && window.ethereum) || providerName === 'WalletConnect') {
        try {
          const connected = await provider.current.initWalletConnect(chainName, providerName);
          if (connected) {
            try {
              await getUserData(providerName, provider.current);
              const callbacks: IEventSubscriberCallbacks = {
                success: [{ accountsChanged: () => getUserData(providerName, provider.current) }],
              };
              provider.current.eventSubscribe(callbacks);
            } catch (err: any) {
              logger('Getting address or balance error', err, 'error');
            }
          }
        } catch (err: any) {
          logger('Ethereum', err, 'error');
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
        } catch (e) {
          logger('TrustWallet connect', e);
        }
      }
      dispatch(setIsLoading(false));
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
    if (localToken && localProviderName && !address) {
      await connect(provider.current.getCurrentChain(), localProviderName as TAvailableProviders);
    }
  }, [address, connect, localProviderName, localToken]);

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
