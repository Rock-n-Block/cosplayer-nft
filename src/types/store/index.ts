import { TNullable } from 'types';

export interface UserState {
  address: TNullable<string>;
  balance: TNullable<string>;
  isLoading: boolean;
}
