import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';

import { logger } from 'utils';

import { report } from '../actions';
import actionTypes from '../actionTypes';

export function* reportSaga({ type, payload: { message, token } }: ReturnType<typeof report>) {
  yield put(request(type));

  try {
    yield call(baseApi.report, { message, token });

    yield put(success(type));
    yield put(closeModal());
    toast.success('You have successfully reported token');
  } catch (e) {
    logger('Report', e);
    yield put(error(type));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.REPORT, reportSaga);
}
