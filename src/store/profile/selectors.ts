import { ProfileState, StoreState } from 'types';

const profileSelector = {
  getProfile: (state: StoreState): ProfileState => state.profile,
  getProp:
    <T extends keyof ProfileState>(key: T) =>
    (state: StoreState): ProfileState[T] =>
      state.profile[key],
};

export default profileSelector;
