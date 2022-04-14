import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { likeNft } from '../actions';
import actionTypes from '../actionTypes';

export function* likeNftSaga({
  type,
  payload: { id, successCallback, errorCallback },
}: ReturnType<typeof likeNft>) {
  yield put(apiActions.request(type));
  try {
    yield call(baseApi.like, { id });
    successCallback();
  } catch (err) {
    logger('like nft', err);
    errorCallback();
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LIKE, likeNftSaga);
}
