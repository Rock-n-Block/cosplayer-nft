import Web3 from 'web3';

import { ISearchProps } from '../index';

import { TAvailableProviders } from 'types/connect';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export type ApproveReq = {
  web3Provider: Web3;
  spender: string;
  amount: string;
  tokenAddress: string;
};

export type GetTokenBalanceReq = {
  web3Provider: Web3;
};

export type LoginReq = {
  address: string;
  providerName: TAvailableProviders;
  web3Provider: Web3;
};

export type UpdateUserInfoReq = {
  web3Provider: Web3;
};

export type GetNftDataReq = {
  id: number | string;
};

export type GetTrendingNftsReq = {
  type: string;
};

export type BuyReq = {
  id: number | string;
  sellerId: string;
  amount: string | number;
  tokenAmount: string | number;
  currency: string;
  web3Provider: Web3;
};

export type CommentReq = {
  text: string;
  token_id: string | number;
};

export type LikeReq = {
  id: number | string;
};

export type LikeCommentReq = {
  id: number | string;
  tokenId: number | string;
};

export type BidReq = {
  id: number | string;
  amount: number;
  currency: string;
  web3Provider: Web3;
};

export type GetProfileInfoReq = {
  id: number | string;
};

export type SearchNftReq = {
  data: {
    text: string;
    page?: number | string;
  };
  props: ISearchProps;
};

export type GetHotNftsReq = {
  sort?: string;
  tag?: string;
};

export type CreateNftReq = {
  formData: FormData;
  web3Provider: Web3;
};

export type LikeNftReq = {
  id: string | number;
  successCallback: () => void;
  errorCallback: () => void;
};

export type BurnReq = {
  id: string | number;
  amount: string | number;
  web3Provider: Web3;
};

export type PatchNftReq = {
  id: number | string;
  formData: FormData;
};

export type TransferReq = {
  id: number | string;
  address: string;
  amount: number | string;
  web3Provider: Web3;
};

export type ReportReq = {
  message: string;
  token: number | string;
};

export type EndAuctionReq = {
  id: number | string;
  web3Provider: Web3;
};

export type SearchHashtagsReq = {
  hashtag: string;
};

export type SearchCountriesReq = {
  country: string;
};
