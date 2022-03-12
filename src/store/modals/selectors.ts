import type { ModalsInitialState, StoreState } from 'types';

export default {
  getModals: (state: StoreState): ModalsInitialState => state.modals,
  // eslint-disable-next-line max-len
  getProp:
    <T extends keyof ModalsInitialState>(propKey: T) =>
    (state: StoreState) =>
      state.modals[propKey],
};
