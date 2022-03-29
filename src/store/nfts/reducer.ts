import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftsState } from '@/types';
import { TokenFull } from '@/types/api/TokenFull';

const initialState: NftsState = {
  nfts: [],
  collections: [],
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
    setTotalPages: (state, action: PayloadAction<number>) => ({
      ...state,
      totalPages: action.payload,
    }),
    setDetailedNft: (state, action: PayloadAction<TokenFull>) => ({
      ...state,
      detailedNft: action.payload,
    }),
    clearNfts: (state) => ({
      ...state,
      nfts: [],
    }),
    clearCollections: (state) => ({
      ...state,
      collections: [],
    }),
  },
});

export const { setNfts, clearCollections, setDetailedNft, setTotalPages, clearNfts } =
  nftsReducer.actions;

export default nftsReducer.reducer;
