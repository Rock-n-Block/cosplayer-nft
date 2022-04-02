import { TAvailableProviders } from 'types';

import { MetaMaskImg, WalletConnectImg } from 'assets/img/wallets';

type Wallet = {
  name: string;
  provider: TAvailableProviders;
  logo: string;
};

export const wallets: Wallet[] = [
  {
    name: 'MetaMask',
    provider: 'MetaMask',
    logo: MetaMaskImg,
  },
  {
    name: 'Wallet Connect',
    provider: 'WalletConnect',
    logo: WalletConnectImg,
  },
];
