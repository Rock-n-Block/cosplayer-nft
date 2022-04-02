import type { NftsState, StoreState } from 'types';

export default {
  getNfts: (state: StoreState): NftsState => state.nfts,
  // eslint-disable-next-line max-len
  getProp:
    <T extends keyof NftsState>(propKey: T) =>
    (state: StoreState) =>
      state.nfts[propKey],
};
