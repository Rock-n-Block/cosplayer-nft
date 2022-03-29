import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { ChainsEnum, IConnectWallet, IContracts } from '@/types';

import { erc20Abi, erc721Abi, erc1155Abi, exchangeAbi } from './abi';

export const IS_PRODUCTION = false;

export const IP_API_KEY = '9440a3014b0b37f2a8798536eeb357504e2973ee1fa2a41af5caceab';

const OPTIONS = {
  rpc: {
    56: 'https://bsc-dataseed1.binance.org',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  chainId: IS_PRODUCTION ? 56 : 97,
};

export const chains: {
  [key: string]: {
    name: ChainsEnum;
    network: INetwork;
    provider: {
      [key: string]: any;
    };
    explorer: string;
  };
} = {
  [ChainsEnum['Binance-Smart-Chain']]: {
    name: ChainsEnum['Binance-Smart-Chain'],
    network: {
      chainID: IS_PRODUCTION ? 56 : 97,
      chainName: IS_PRODUCTION ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: IS_PRODUCTION
        ? 'https://bsc-dataseed.binance.org/'
        : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      blockExplorerUrl: IS_PRODUCTION ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
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
    explorer: IS_PRODUCTION ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
  },
};

export const connectWallet = (chainName: ChainsEnum): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect'],
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: IS_PRODUCTION ? 'mainnet' : 'testnet',
  names: ['EXCHANGE', 'REC', 'COSNFT', 'ERC721', 'ERC1155'],
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
    REC: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '0xC016ade316C401fFFd2998Da3F00683b2D793350',
        abi: erc20Abi,
      },
    },
    COSNFT: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '0xe28a6FE1d5412f43fF33b8D302c3c2E1C6ca13f5',
        abi: erc20Abi,
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
