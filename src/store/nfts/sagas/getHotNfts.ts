import { toast } from 'react-toastify';

import { clearHotNfts, setHotNfts } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { TokenFull } from 'types';

import { getHotNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* getHotNftsSaga({ type, payload }: ReturnType<typeof getHotNfts>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getHotNfts, payload);
    const camelizedResult = camelize(data.results) as TokenFull[];

    yield put(setHotNfts(camelizedResult));

    yield put(apiActions.success(type));
  } catch (err) {
    logger('get hot nfts', err);
    yield put(clearHotNfts());
    toast.error('Sorting NFTs error');
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.HOT_NFTS, getHotNftsSaga);
}
