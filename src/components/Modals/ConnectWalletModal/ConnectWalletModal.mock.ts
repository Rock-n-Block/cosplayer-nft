import { TAvailableProviders } from 'types';

import { MetaMaskImg, TrustImg, WalletConnectImg } from 'assets/img/wallets';

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
    name: 'Trust Wallet',
    provider: 'TrustWallet',
    logo: TrustImg,
  },
  {
    name: 'Wallet Connect',
    provider: 'WalletConnect',
    logo: WalletConnectImg,
  },
];
