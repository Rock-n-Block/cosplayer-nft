/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import createTokenSaga from './createToken';

export default function* nftSagas() {
  yield fork(createTokenSaga);
}
