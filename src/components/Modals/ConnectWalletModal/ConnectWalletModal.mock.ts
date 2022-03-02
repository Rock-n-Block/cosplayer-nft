import { MetaMaskImg, SafePalImg, TrustImg } from 'assets/img/wallets';

type Wallet = {
  name: string;
  provider: string;
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
    name: 'SafePal',
    provider: 'SafePal',
    logo: SafePalImg,
  },
];
