import { User } from 'types/api';
import { TAvailableProviders } from 'types/connect';

export type UserState = User & {
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
  loading: boolean;
};

export type MetamaskLoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
