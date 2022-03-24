import { WalletService } from 'services/WalletService';
import { chainsEnum, TAvailableProviders } from 'types/connect';

export interface IWalletContext {
  connect: (chainName: chainsEnum, providerName: TAvailableProviders) => Promise<boolean>;
  disconnect: () => void;
  walletService: WalletService;
}
