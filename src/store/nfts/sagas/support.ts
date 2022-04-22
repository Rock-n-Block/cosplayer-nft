import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';

import { logger } from 'utils';

import { support } from '../actions';
import actionTypes from '../actionTypes';

export function* supportSaga({ type, payload }: ReturnType<typeof support>) {
  yield put(request(type));

  try {
    yield call(baseApi.support, payload);

    yield put(success(type));
    yield put(closeModal());

    toast.success('You have successfully send support ticket');
  } catch (e) {
    logger('Send support ticket', e);
    put(error(type));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SUPPORT, supportSaga);
}
