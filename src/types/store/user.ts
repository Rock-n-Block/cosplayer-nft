import { TAvailableProviders } from 'types/connect';

export type UserState = {
  id: number | null;
  avatar: string;
  address: string;
  rates: {
    bnb: string | number;
    cosnft: string | number;
    rec: string | number;
  };
  balance: {
    bnb: string | number;
    cosnft: string | number;
    rec: string | number;
  };
  key: string;
  provider: TAvailableProviders;
  displayName: string;
  customUrl: string;
};

export type LoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
