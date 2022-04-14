import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftsState } from 'types';
import { TokenFull } from 'types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  hotNfts: [],
  searchedNfts: [],
  detailedNft: null,
  totalPages: 0,
  loading: false,
};

export const nftsReducer = createSlice({
  name: 'nfts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
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
      detailedNft: null,
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
  setLoading,
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
