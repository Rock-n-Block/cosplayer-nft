import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'types';

const initialState: User & { posted: number } = {
  address: undefined,
  avatar: undefined,
  bio: undefined,
  cover: undefined,
  createdAt: undefined,
  customUrl: undefined,
  displayName: undefined,
  facebook: undefined,
  followers: undefined,
  followersCount: undefined,
  follows: undefined,
  followsCount: undefined,
  id: undefined,
  instagram: undefined,
  isVerificated: undefined,
  site: undefined,
  twitter: undefined,
  email: undefined,
  posted: 0,
};

export const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<User>>) => ({
      ...state,
      ...action.payload,
    }),
    setPosted: (state, action: PayloadAction<number>) => ({
      ...state,
      posted: action.payload,
    }),
    clearProfile: () => ({
      ...initialState,
    }),
  },
});

export const { updateProfile, setPosted, clearProfile } = profileReducer.actions;
export default profileReducer.reducer;
