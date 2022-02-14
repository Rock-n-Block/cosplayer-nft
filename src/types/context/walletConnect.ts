import { TWalletService } from 'services/WalletService';
import { chainsEnum, TAvailableProviders } from 'types/connect';

export interface IWalletContext {
  connect: (chainName: chainsEnum, providerName: TAvailableProviders) => void;
  disconnect: () => void;
  walletService: TWalletService;
}
