/* eslint-disable import/no-named-as-default */
import { fork } from 'redux-saga/effects';

import approveSaga from './approve';
import approveNftSaga from './approveNft';
import bidNftSaga from './bid';
import burnSaga from './burn';
import buySaga from './buy';
import commentSaga from './comment';
import createTokenSaga from './createToken';
import deleteCommentSaga from './deleteComment';
import endAuctionSaga from './endAuction';
import getCollectionsSaga from './getCollections';
import getNftDataSaga from './getNftData';
import likeCommentSaga from './likeComment';
import likeNftSaga from './likeNft';
import patchNftDataSaga from './patchNftData';
import reportSaga from './report';
import searchCountriesSaga from './searchCountries';
import searchHashtagsSaga from './searchHashtags';
import searchNftsSaga from './searchNfts';
import supportSaga from './support';
import transferSaga from './transfer';

export default function* nftSagas() {
  yield fork(getCollectionsSaga);
  yield fork(createTokenSaga);
  yield fork(likeNftSaga);
  yield fork(getNftDataSaga);
  yield fork(patchNftDataSaga);
  yield fork(approveSaga);
  yield fork(buySaga);
  yield fork(burnSaga);
  yield fork(transferSaga);
  yield fork(bidNftSaga);
  yield fork(endAuctionSaga);
  yield fork(commentSaga);
  yield fork(likeCommentSaga);
  yield fork(deleteCommentSaga);
  yield fork(reportSaga);
  yield fork(supportSaga);
  yield fork(searchNftsSaga);
  yield fork(searchHashtagsSaga);
  yield fork(searchCountriesSaga);
  yield fork(approveNftSaga);
}
