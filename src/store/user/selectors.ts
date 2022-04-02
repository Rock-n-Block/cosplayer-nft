import type { StoreState, UserState } from 'types';

export default {
  getUser: (state: StoreState): UserState => state.user,
  getProp:
    <T extends keyof UserState>(propKey: T) =>
    (state: StoreState) =>
      state.user[propKey],
};
