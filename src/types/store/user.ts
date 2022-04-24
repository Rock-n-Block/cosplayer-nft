import { Currencies } from '../index';

import { User } from 'types/api';
import { TAvailableProviders } from 'types/connect';

type Rates = {
  [key in Currencies]: string | number;
};

export type UserState = User & {
  rates: Rates;
  balance: Rates;
  fee: number;
  key: string;
  provider: TAvailableProviders;
};

export type MetamaskLoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
