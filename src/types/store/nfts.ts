import { IBaseInfo } from '../index';

import { TokenFull } from '../api';

export type NftsState = {
  nfts: TokenFull[];
  collections: IBaseInfo[];
  // detailedNft: TokenFull;
  totalPages: number;
};
