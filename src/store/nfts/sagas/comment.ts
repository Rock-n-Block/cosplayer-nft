import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { comment } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* commentSaga({ type, payload: { text, token_id } }: ReturnType<typeof comment>) {
  yield put(request(type));

  try {
    yield call(baseApi.comment, { text, token_id });

    yield call(getNftDataSaga, { type: actionTypes.GET_NFT_DATA, payload: { id: token_id } });

    yield put(success(type));
    toast.success('You have successfully leave a comment');
  } catch (e) {
    yield put(error(type));
    logger('Comment', e);
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.COMMENT, commentSaga);
}
