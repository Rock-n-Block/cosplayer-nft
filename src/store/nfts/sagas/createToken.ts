import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';

import { logger } from '@/utils';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({ type, payload }: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createNewToken, payload);
    logger('data', data);
  } catch (err) {
    logger('createTokenSaga', err);
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}
