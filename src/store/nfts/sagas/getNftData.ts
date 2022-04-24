import { toast } from 'react-toastify';

import { setDetailedNft } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { TokenFull } from 'types';

import { getNftData } from '../actions';
import actionTypes from '../actionTypes';

export function* getNftDataSaga({ type, payload: { id } }: ReturnType<typeof getNftData>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.getNftInfo, id);

    if (data !== 'token not found') {
      yield put(setDetailedNft(camelize(data) as TokenFull));

      yield put(apiActions.success(type));
    } else {
      window.location.href = '/404';
      yield put(apiActions.error(type));
    }
  } catch (err) {
    logger('Get NFT data', err);
    toast.error('Getting NFT data error. Try another NFT');
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_NFT_DATA, getNftDataSaga);
}
