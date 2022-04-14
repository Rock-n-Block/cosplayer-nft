import type { NftsState, StoreState } from 'types';

export default {
  getNfts: (state: StoreState): NftsState => state.nfts,
  getProp:
    <T extends keyof NftsState>(propKey: T) =>
    (state: StoreState) =>
      state.nfts[propKey],
};
