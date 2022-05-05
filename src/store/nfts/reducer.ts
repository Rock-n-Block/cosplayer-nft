import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionSlim, ICountry, IHashtag, NftsState, User } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  collections: [],
  hashtags: [],
  countries: [],
  searchedUsers: [],
  detailedNft: {} as TokenFull,
  totalPages: 0,
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<CollectionSlim[]>) => ({
      ...state,
      collections: action.payload,
    }),
    setNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      nfts: action.payload,
    }),
    setHashtags: (state, action: PayloadAction<IHashtag[]>) => ({
      ...state,
      hashtags: action.payload,
    }),
    setCountries: (state, action: PayloadAction<ICountry[]>) => ({
      ...state,
      countries: action.payload,
    }),
    setSearchedUsers: (state, action: PayloadAction<User[]>) => ({
      ...state,
      searchedUsers: action.payload,
    }),
    setTotalPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalPages: action.payload,
    }),
    setDetailedNft: (state, action: PayloadAction<TokenFull>) => ({
      ...state,
      detailedNft: action.payload,
    }),
    clearDetailedNft: (state) => ({
      ...state,
      detailedNft: {} as TokenFull,
    }),
    clearNfts: (state) => ({
      ...state,
      nfts: [],
    }),
    clearHotNfts: (state) => ({
      ...state,
      hotNfts: [],
    }),
    clearSearchedNfts: (state) => ({
      ...state,
      searchedNfts: [],
    }),
  },
});

export const {
  setCollections,
  setNfts,
  setHashtags,
  setCountries,
  setSearchedUsers,
  setDetailedNft,
  setTotalPages,
  clearDetailedNft,
  clearNfts,
  clearHotNfts,
  clearSearchedNfts,
} = nftsReducer.actions;

export default nftsReducer.reducer;
