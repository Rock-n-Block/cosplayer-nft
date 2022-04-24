import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftsState } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  hotNfts: [],
  searchedNfts: [],
  detailedNft: {} as TokenFull,
  totalPages: 0,
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      nfts: action.payload,
    }),
    setHotNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      hotNfts: action.payload,
    }),
    setSearchedNfts: (state, action: PayloadAction<TokenFull[]>) => ({
      ...state,
      searchedNfts: action.payload,
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
  setNfts,
  setHotNfts,
  setSearchedNfts,
  setDetailedNft,
  setTotalPages,
  clearDetailedNft,
  clearNfts,
  clearHotNfts,
  clearSearchedNfts,
} = nftsReducer.actions;

export default nftsReducer.reducer;
