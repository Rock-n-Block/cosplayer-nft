import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAvailableProviders, UserState } from 'types';

const initialState: UserState = {
  id: null,
  avatar: '',
  address: '',
  balance: 0,
  key: '',
  provider: '' as TAvailableProviders,
  displayName: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateWallet: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateProvider: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    connectWalletState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: () => {
      localStorage.removeItem('phenom-wallet-connect');
      return {
        ...initialState,
      };
    },
  },
});

export const { connectWalletState, disconnectWalletState, updateWallet, updateProvider } =
  userReducer.actions;

export default userReducer.reducer;
