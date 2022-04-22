import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { likeComment } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* likeCommentSaga({
  type,
  payload: { id, tokenId },
}: ReturnType<typeof likeComment>) {
  yield put(request(type));

  try {
    yield call(baseApi.likeComment, { id });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: { id: tokenId },
    });

    yield put(success(type));
  } catch (e) {
    logger('Like comment', e);
    put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LIKE_COMMENT, likeCommentSaga);
}
