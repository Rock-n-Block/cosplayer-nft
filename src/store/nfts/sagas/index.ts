/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import approveSaga from './approve';
import bidNftSaga from './bid';
import burnSaga from './burn';
import buySaga from './buy';
import commentSaga from './comment';
import createTokenSaga from './createToken';
import getHotNftsSaga from './getHotNfts';
import getNftDataSaga from './getNftData';
import likeCommentSaga from './likeComment';
import likeNftSaga from './likeNft';
import patchNftDataSaga from './patchNftData';
import reportSaga from './report';
import supportSaga from './support';
import transferSaga from './transfer';

export default function* nftSagas() {
  yield fork(createTokenSaga);
  yield fork(getHotNftsSaga);
  yield fork(likeNftSaga);
  yield fork(getNftDataSaga);
  yield fork(patchNftDataSaga);
  yield fork(approveSaga);
  yield fork(buySaga);
  yield fork(burnSaga);
  yield fork(transferSaga);
  yield fork(bidNftSaga);
  yield fork(commentSaga);
  yield fork(likeCommentSaga);
  yield fork(reportSaga);
  yield fork(supportSaga);
}
