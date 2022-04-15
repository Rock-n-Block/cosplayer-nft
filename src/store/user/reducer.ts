import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAvailableProviders, UserState } from 'types';

const initialState: UserState = {
  id: '',
  avatar: '',
  address: '',
  customUrl: '',
  email: '',
  balance: {
    bnb: '0',
    cosnft: '0',
    rec: '0',
  },
  rates: {
    bnb: '0',
    cosnft: '0',
    rec: '0',
  },
  country: '',
  site: '',
  twitter: '',
  instagram: '',
  isVerificated: false,
  bio: '',
  key: '',
  provider: '' as TAvailableProviders,
  displayName: '',
  loading: false,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    disconnectWalletState: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const { disconnectWalletState, updateUserState, setLoading } = userReducer.actions;

export default userReducer.reducer;
