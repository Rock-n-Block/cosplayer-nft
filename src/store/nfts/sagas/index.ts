/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import createTokenSaga from './createToken';
import getHotNftsSaga from './getHotNfts';
import likeNftSaga from './likeNft';

export default function* nftSagas() {
  yield fork(createTokenSaga);
  yield fork(getHotNftsSaga);
  yield fork(likeNftSaga);
}
