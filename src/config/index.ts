import { INetwork } from '@amfi/connect-wallet/dist/interface';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { erc721Abi, erc1155Abi, exchangeAbi } from './abi';

export const is_production = false;

const OPTIONS = {
  rpc: {
    56: 'https://bsc-dataseed1.binance.org',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  chainId: is_production ? 56 : 97,
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: OPTIONS,
  },
};

export const chains: {
  [key: string]: {
    name: chainsEnum;
    network: INetwork;
    provider: {
      [key: string]: any;
    };
    explorer: string;
  };
} = {
  [chainsEnum['Binance-Smart-Chain']]: {
    name: chainsEnum['Binance-Smart-Chain'],
    network: {
      chainID: is_production ? 56 : 97,
      chainName: is_production ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: is_production
        ? 'https://bsc-dataseed.binance.org/'
        : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      blockExplorerUrl: is_production ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: OPTIONS,
        },
      },
    },
    explorer: is_production ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
  },
};

export const connectWallet = (chainName: chainsEnum): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect'],
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: ['EXCHANGE', 'ERC721', 'ERC1155'],
  params: {
    EXCHANGE: {
      mainnet: {
        address: '',
        abi: exchangeAbi,
      },
      testnet: {
        address: '0x6a7A180204c798ad5A5a6e3dEDF20a3bdaEbBFbc',
        abi: exchangeAbi,
      },
    },
    ERC721: {
      mainnet: {
        address: '',
        abi: erc721Abi,
      },
      testnet: {
        address: '0x74cdc21b4Bec25A464298918911902AF369B69D0',
        abi: erc721Abi,
      },
    },
    ERC1155: {
      mainnet: {
        address: '',
        abi: erc1155Abi,
      },
      testnet: {
        address: '0x513dDb3488c8FFC08b08394e4DBfe767cb21e465',
        abi: erc1155Abi,
      },
    },
  },
};
