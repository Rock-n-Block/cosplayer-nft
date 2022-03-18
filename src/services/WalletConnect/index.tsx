import {
  createContext,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import { login, updateUserInfo } from 'store/user/actions';
import { disconnectWalletState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { Subscription } from 'rxjs';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { is_production, providerOptions } from 'config';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';
import WalletService, { TWalletService } from 'services/WalletService';
import { chainsEnum, IWalletContext, StoreState, TAvailableProviders, UserState } from 'types';

const WalletConnectContext = createContext<IWalletContext>({} as IWalletContext);

const Connect: FC = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscription | any>();
  const dispatch = useDispatch();
  const {
    address,
    key,
    provider: WalletProvider,
  } = useShallowSelector<StoreState, UserState>(userSelector.getUser);
  const walletService = useRef<TWalletService>(WalletService);

  const subscriberSuccess = useCallback(
    (data: any) => {
      if (data.name === 'accountsChanged') {
        dispatch(
          login({
            address: data.address,
            providerName: WalletProvider,
            web3Provider: walletService.current.Web3(),
          }),
        );
      }
    },
    [WalletProvider, dispatch],
  );

  const subscriberError = useCallback(
    (err: any) => {
      logger('subscriber', err, 'error');
      if (err.code === 4) {
        walletService.current.logOut();
        toast.error(
          `You changed to wrong network. Please choose Binance Smart Chain ${
            is_production ? 'Mainnet' : 'Testnet'
          }`,
        );
        dispatch(disconnectWalletState());
      }
    },
    [dispatch],
  );

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: TAvailableProviders): Promise<boolean> => {
      try {
        let web3provider: Web3 = {} as Web3;
        let connected = false;
        if ((providerName === 'MetaMask' && window.ethereum) || providerName === 'WalletConnect') {
          connected = await walletService.current.initWalletConnect(chainName, providerName);
          web3provider = walletService.current.Web3();
        } else {
          try {
            const web3Modal = new Web3Modal({
              cacheProvider: true,
              providerOptions,
            });

            const web3 = await web3Modal.connect();
            await web3Modal.toggleModal();
            web3provider = new Web3(web3);
            connected = true;
          } catch (e) {
            logger('connect TrustWallet', e, 'error');
          }
        }
        if (connected) {
          try {
            const sub = walletService.current
              .eventSubscriber()
              .subscribe(subscriberSuccess, subscriberError);
            let accountInfo = {} as IConnect | IError | { address: string };
            if (providerName === 'TrustWallet') {
              const accounts = await web3provider.eth.getAccounts();
              if ('address' in accountInfo) {
                // eslint-disable-next-line prefer-destructuring
                accountInfo.address = accounts[0];
              }
            } else {
              accountInfo = await walletService.current.getAccount();
            }
            if (key?.length && 'address' in accountInfo && address === accountInfo.address) {
              dispatch(updateUserInfo({ web3Provider: web3provider, address }));
            } else if ('address' in accountInfo) {
              dispatch(
                login({
                  address: accountInfo.address,
                  providerName,
                  web3Provider: web3provider,
                }),
              );
            }
            setCurrentSubscriber(sub);
            return true;
          } catch (err: any) {
            logger('Getting address or balance error', err, 'error');
            return false;
          }
        }
        return false;
      } catch (err: any) {
        logger('initWalletConnect', err, 'error');
        return false;
      }
    },
    [address, dispatch, key?.length, subscriberError, subscriberSuccess],
  );

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    dispatch(closeModal());
    currentSubscriber?.unsubscribe();
  }, [currentSubscriber, dispatch]);

  const WalletConnectValues = useMemo(
    () => ({
      connect,
      disconnect,
      walletService: walletService.current,
    }),
    [connect, disconnect],
  );

  useEffect(() => {
    if (WalletProvider) {
      connect(chainsEnum['Binance-Smart-Chain'], WalletProvider);
    }
  }, [WalletProvider, connect]);

  return (
    <WalletConnectContext.Provider value={WalletConnectValues}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export default memo(Connect);

export const useWalletConnectorContext = () => useContext(WalletConnectContext);
