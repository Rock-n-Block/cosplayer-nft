import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import { login, updateUserInfo } from 'store/user/actions';
import { disconnectWalletState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';

import { IS_PRODUCTION } from 'config';
import { logger } from 'utils';

import { useShallowSelector } from 'hooks';
import { WalletService } from 'services/WalletService';
import { ChainsEnum, IWalletContext, StoreState, TAvailableProviders, UserState } from 'types';

const WalletConnectContext = createContext<IWalletContext>({} as IWalletContext);

const Connect: FC<{ children: any }> = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<any>();
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
        logger('login params:', [data.address, WalletProvider]);
        dispatch(
          login({
            address: data.address,
            providerName: WalletProvider || 'MetaMask',
            web3Provider: walletService.Web3(),
          }),
        );
        toast.info('Please sign login message at MetaMask');
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
            IS_PRODUCTION ? 'Mainnet' : 'Testnet'
          }`,
        );
        disconnect();
      }
    },
    [disconnect],
  );

  const connect = useCallback(
    async (chainName: ChainsEnum, providerName: TAvailableProviders) => {
      const connected = await walletService.initWalletConnect(chainName, providerName);
      if (connected) {
        try {
          if (!currentSubscriber) {
            const sub = walletService
              .eventSubscriber()
              .subscribe(subscriberSuccess, subscriberError);
            setCurrentSubscriber(sub);
          }

          const accountInfo: any = await walletService.getAccount();
          if (key?.length && address === accountInfo?.address) {
            dispatch(updateUserInfo({ web3Provider: walletService.Web3() }));
            return;
          }

          if (accountInfo?.address) {
            dispatch(
              login({
                address: accountInfo.address,
                providerName,
                web3Provider: walletService.Web3(),
              }),
            );
          }
        } catch (err: any) {
          logger('Getting address or balance error', err, 'error');
          if (err.code === 4) {
            window.open(
              `https://metamask.app.link/dapp/${
                window.location.hostname + window.location.pathname
              }/?utm_source=mm`,
            );
          }
        }
      }
    },
    [address, currentSubscriber, dispatch, key, subscriberError, subscriberSuccess, walletService],
  );

  useEffect(() => {
    if (WalletProvider) {
      logger('autoconnect');
      connect(ChainsEnum['Binance-Smart-Chain'], WalletProvider);
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

export default Connect;

export const useWalletConnectorContext = () => useContext(WalletConnectContext);
