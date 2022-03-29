import type { ModalsInitialState, StoreState } from '@/types';

export default {
  getModalState: (state: StoreState): ModalsInitialState => state.modals,
  getProp:
    <T extends keyof ModalsInitialState>(propKey: T) => (state: StoreState) => state.modals[propKey],
};
