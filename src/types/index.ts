import { ActiveModal } from './store';

import { Creator, Currency, UserSlim } from './api';

export * from './context';
export * from './store';
export * from './api';
export * from './connect';
export * from './requests';
export * from './response';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export type Currencies = 'bnb' | 'rec';

export type ButtonColors =
  | 'default'
  | 'inactive'
  | 'grey'
  | 'orange'
  | 'blue'
  | 'red'
  | 'bordered'
  | 'white'
  | 'disabled';

export type ProfileNavbarTabs = 'for-sale' | 'created' | 'owned' | 'sold' | 'bidded';

export type StoreModalProps = {
  id: ActiveModal;
};

export interface IDropdownItem {
  value: string;
  label: string;
  icon: string;
}

export interface IDropdownCurrency {
  value: Currencies;
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
  user: UserSlim;
  id: string | number;
  text: string;
  likeCount: number | string;
  createdAt: string;
  likedBy: UserSlim[];
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
  tokenID: string | number;
  blockchain: 'Binance Smart Chain' | 'Binance Smart Chain Testnet';
}

export interface IBidder {
  amount: string | number;
  quantity: string | number;
  bidder: string;
  bidderAvatar: string;
  bidderId: number | string;
  currency: Currency;
  id: number | string;
  state: string;
}

export interface IOwner extends Omit<Creator, 'address'> {
  price: number;
  quantity: number;
  currency: Currency;
}

export interface ISeller {
  avatar: string;
  id: number | string;
  name: string;
  quantity: number | string;
  price: number | string;
  currency: Currency;
}

export interface IHistory {
  id: number | string;
  method: string;
  date: string;
  newOwner: UserSlim;
  oldOwner: UserSlim;
  price: number | string;
  amount: number | string;
}

export interface IOwnerAuction {
  id: number | string;
  name: string;
  address: string;
  avatar: string;
  quantity: number | string;
}

export interface ISearchProps {
  type?: 'items' | 'users';
  orderBy?: string;
  onSale?: boolean;
  tags?: string;
  creator?: string;
  owner?: string;
  hashtag?: string;
  country?: string;
  sold?: boolean;
  bidded?: boolean;
}
