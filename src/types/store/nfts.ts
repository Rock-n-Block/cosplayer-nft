import { TokenFull } from '../api';

export type NftsState = {
  nfts: TokenFull[];
  hotNfts: TokenFull[];
  searchedNfts: TokenFull[];
  detailedNft: TokenFull | null;
  totalPages: number;
  loading: boolean;
};
