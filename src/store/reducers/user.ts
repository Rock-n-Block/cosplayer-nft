import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'types/store';

const initialState: UserState = {
  address: '',
  balance: '',
  isLoading: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload;
    },
  },
});

export default UserSlice.reducer;
