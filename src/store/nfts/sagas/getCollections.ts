import { setCollections } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { getCollections } from '../actions';
import actionTypes from '../actionTypes';

export function* getCollectionsSaga({ type }: ReturnType<typeof getCollections>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.getCollections);
    yield put(setCollections(data.results));
    yield put(success(type));
  } catch (e) {
    logger('get collections', e);
    yield put(error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_COLLECTIONS, getCollectionsSaga);
}
