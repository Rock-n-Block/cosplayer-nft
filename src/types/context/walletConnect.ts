import { WalletService } from 'services/WalletService';
import { ChainsEnum, TAvailableProviders } from 'types/connect';

export interface IWalletContext {
  connect: (chainName: ChainsEnum, providerName: TAvailableProviders) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}
