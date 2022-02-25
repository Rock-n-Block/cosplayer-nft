export * from './connect';
export * from './context';
export * from './store';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface IDropdownItem {
  value: string;
  label: string;
  icon: string;
}

export interface ICategory {
  name: string;
  logo: string;
  isActive: boolean;
}

export interface IUser {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface IComment {
  author: IUser;
  text: string;
  isLiked: boolean;
  likes: number;
  time: string;
}

export interface ITokenInfo {
  user: IUser;
  price: string;
  date?: string;
  time?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  count?: number;
  type: 'auctioned' | 'Purchased' | 'offered' | 'bid';
  isActive?: boolean;
}

export interface IAdditionalInfo {
  contractAddress: string;
  tokenID: number;
  blockchain: 'Binance Smart Chain' | 'Binance Smart Chain Testnet';
}
