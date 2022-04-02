import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { WalletsConnect } from '@amfi/connect-wallet/dist/wallet-connect';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { connectWallet } from 'config';
import { bep20Abi, erc20Abi } from 'config/abi';
import { logger } from 'utils';

import { ChainsEnum, TAvailableProviders } from 'types/connect';

type TokenAbiType = {
  [key in ChainsEnum]: Array<AbiItem>;
};

const tokenAbis: TokenAbiType = {
  'Binance-Smart-Chain': bep20Abi as Array<AbiItem>,
  'Ethereum': erc20Abi as Array<AbiItem>,
};

export class WalletService {
  public connectWallet;

  private currentChain: ChainsEnum = ChainsEnum['Binance-Smart-Chain'];

  constructor() {
    this.connectWallet = new ConnectWallet();
  }

  public async initWalletConnect(
    chainName: ChainsEnum,
    providerName: TAvailableProviders,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWallet(chainName);

      const connection = this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: boolean | {}) => {
          if (connected) {
            this.currentChain = chainName;
            return connected;
          }
          throw new Error('connection error');
        })
        .catch((error: any) => {
          logger('connection error', error);
        });

      Promise.all([connection]).then((connect: any) => {
        resolve(connect[0]);
      });
    });
  }

  public logOut(): void {
    this.connectWallet.resetConect();
  }

  public Web3(): Web3 {
    return this.connectWallet.currentWeb3();
  }

  public getTokenBalance(address: string): Promise<string> {
    const contract = this.connectWallet.getContract({
      address,
      abi: tokenAbis[this.currentChain],
    });

    return contract.methods.decimals.call();
  }

  public getAccount(): Promise<IConnect | IError | { address: string }> {
    return this.connectWallet.getAccounts();
  }

  public getBalance(address: string): Promise<string | number> {
    return this.connectWallet.getBalance(address);
  }

  public getCurrentChain() {
    return this.currentChain;
  }

  public async signMsg(providerName: TAvailableProviders, walletAddress: string, msg: string) {
    if (providerName === 'WalletConnect') {
      const msgLength = new Blob([msg]).size;
      let message = `\x19Ethereum Signed Message:\n${msgLength}${msg}`;
      message = Web3.utils.keccak256(message);
      const params = [walletAddress, message];
      const connector = this.connectWallet.getConnector();
      if (connector instanceof WalletsConnect) {
        return connector.connector.request({
          method: 'eth_sign',
          params,
        });
      }
      return Error('Signing message with WalletConnect error');
    }
    return this.connectWallet.signMsg(walletAddress, msg);
  }

  public eventSubscriber() {
    return this.connectWallet.eventSubscriber();
  }
}
