/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { useTypedDispatch, useTypedSelector } from 'store';
import { UserSlice } from 'store/reducers/user';

import { logger } from 'utils';

import useLocalStorage from 'hooks/useLocalStorage';
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
  const [localProviderName, setLocalProviderName] = useLocalStorage(
    `${import.meta.env.VITE_PROJECT_NAME}-provider`,
    '',
  );

  const disconnect = useCallback(() => {
    setLocalProviderName('');
    dispatch(setAddress(''));
    dispatch(setBalance('0'));
  }, [dispatch]);

  const getUserData = useCallback(
    async (providerName: string) => {
      const res = await provider.current.getAccount(address || '');
      if ('address' in res) {
        const balance = await provider.current.getBalance(res.address);
        dispatch(setAddress(res.address));
        dispatch(setBalance(balance.toString()));
        setLocalProviderName(providerName);
      }
    },
    [address],
  );

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: TAvailableProviders) => {
      dispatch(setIsLoading(true));
      if (window.ethereum) {
        try {
          const connected = await provider.current.initWalletConnect(chainName, providerName);
          if (connected) {
            try {
              await getUserData(providerName);
              const callbacks: IEventSubscriberCallbacks = {
                success: [{ accountsChanged: () => getUserData(providerName) }],
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
      dispatch(setIsLoading(false));
    },
    [dispatch, getUserData],
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
    if (window.ethereum && localProviderName) {
      await connect(provider.current.getCurrentChain(), localProviderName as TAvailableProviders);
    }
  }, []);

  useEffect(() => {
    firstConnection();
  }, []);

  return (
    <WalletConnectContext.Provider value={WalletConnectValues}>
      {children};
    </WalletConnectContext.Provider>
  );
};

export default Connect;

export const useWalletConnectorContext = () => {
  return useContext(WalletConnectContext);
};
