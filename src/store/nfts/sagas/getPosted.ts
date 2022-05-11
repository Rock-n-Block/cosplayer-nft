import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setPosted } from 'store/profile/reducer';

import { logger } from 'utils';

import { TokenFull } from 'types';

import { getPosted } from '../actions';
import actionTypes from '../actionTypes';

export function* getPostedSaga({ type, payload: { creator } }: ReturnType<typeof getPosted>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.searchNfts, {
      data: { text: '' },
      props: { type: 'items', creator },
    });

    const tokens = data.items.filter((item: TokenFull) => item.selling);
    yield put(setPosted(tokens.length));

    yield put(success(type));
  } catch (e) {
    logger('Getting posted', e);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_POSTED, getPostedSaga);
}
