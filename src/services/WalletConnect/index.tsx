import {
  createContext,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import { login, updateUserInfo } from 'store/user/actions';
import { disconnectWalletState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { Subscription } from 'rxjs';

import { is_production } from 'config';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';
import { WalletService } from 'services/WalletService';
import { chainsEnum, IWalletContext, StoreState, TAvailableProviders, UserState } from 'types';

const WalletConnectContext = createContext<IWalletContext>({} as IWalletContext);

const Connect: FC = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscription | any>();
  const walletService = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    address,
    key,
    provider: WalletProvider,
  } = useShallowSelector<StoreState, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    dispatch(closeModal());
    walletService.logOut();
    currentSubscriber?.unsubscribe();
    setCurrentSubscriber(null);
  }, [currentSubscriber, dispatch, walletService]);

  const subscriberSuccess = useCallback(
    (data: any) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
        return;
      }

      if (data.name === 'accountsChanged') {
        dispatch(
          login({
            address: data.address,
            providerName: WalletProvider,
            web3Provider: walletService.Web3(),
          }),
        );
      }
    },
    [WalletProvider, disconnect, dispatch, walletService],
  );

  const subscriberError = useCallback(
    (err: any) => {
      logger('subscriber', err, 'error');
      if (err.code === 4) {
        toast.error(
          `You changed to wrong network. Please choose Binance Smart Chain ${
            is_production ? 'Mainnet' : 'Testnet'
          }`,
        );
        disconnect();
      }
    },
    [disconnect],
  );

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: TAvailableProviders): Promise<boolean> => {
      const connected = await walletService.initWalletConnect(chainName, providerName);
      if (connected) {
        try {
          if (!currentSubscriber) {
            const sub = walletService
              .eventSubscriber()
              .subscribe(subscriberSuccess, subscriberError);
            setCurrentSubscriber(sub);
          }

          const accountInfo = await walletService.getAccount();
          if (key?.length && 'address' in accountInfo && address === accountInfo.address) {
            dispatch(updateUserInfo({ web3Provider: walletService.Web3() }));
            return true;
          }

          if ('address' in accountInfo) {
            dispatch(
              login({
                address: accountInfo.address,
                providerName,
                web3Provider: walletService.Web3(),
              }),
            );
          }
          return true;
        } catch (err: any) {
          logger('Getting address or balance error', err, 'error');
          if (err.code === 4) {
            window.open(
              `https://metamask.app.link/dapp/${
                window.location.hostname + window.location.pathname
              }/?utm_source=mm`,
            );
          }
          return false;
        }
      }
      return false;
    },
    [
      address,
      currentSubscriber,
      dispatch,
      key?.length,
      subscriberError,
      subscriberSuccess,
      walletService,
    ],
  );

  useEffect(() => {
    if (WalletProvider) {
      connect(chainsEnum['Binance-Smart-Chain'], WalletProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const WalletConnectValues = useMemo(
    () => ({
      connect,
      disconnect,
      walletService,
    }),
    [connect, disconnect, walletService],
  );

  return (
    <WalletConnectContext.Provider value={WalletConnectValues}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export default memo(Connect);

export const useWalletConnectorContext = () => useContext(WalletConnectContext);
