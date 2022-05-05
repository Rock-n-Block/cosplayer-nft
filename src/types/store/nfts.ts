import { CollectionSlim, ICountry, IHashtag } from '../index';

import { TokenFull, User } from '../api';

export type NftsState = {
  nfts: TokenFull[];
  collections: CollectionSlim[];
  hashtags: IHashtag[];
  countries: ICountry[];
  searchedUsers: User[];
  detailedNft: TokenFull;
  totalPages: number;
};
