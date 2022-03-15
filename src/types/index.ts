import { ActiveModal } from './store';

export * from './context';
export * from './store';
export * from './api';
export * from './connect';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

declare global {
  interface Window {
    ethereum: any;
  }
}

export type StoreModalProps = {
  id: ActiveModal;
};

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

export interface ICurrency {
  image: string;
  name: string;
  rate: string;
  symbol: string;
}

export interface IBaseInfo {
  is_verificated: TOptionable<boolean>;
  address: string;
  avatar: string;
  id: number;
  name: string;
  display_theme: 'Padded' | 'Contained' | 'Covered';
}

export interface IBidder {
  amount: string | number;
  bidder: string;
  bidder_avatar: string;
  bidder_id: number | string;
  currency: ICurrency;
  id: number | string;
}

export interface IOwner extends Omit<IBaseInfo, 'address'> {
  price: number;
  quantity: number;
  currency: ICurrency;
}
