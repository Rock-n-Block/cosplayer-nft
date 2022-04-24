import { disconnectWalletState, updateUserState } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { getBalance, updateUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* updateUserInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof updateUserInfo>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.getSelfInfo);
    const { data: fee } = yield call(baseApi.getFee);

    yield put(updateUserState({ ...camelize(data), fee: +fee }));
    yield put(getBalance({ web3Provider }));

    yield put(success(type));
  } catch (err) {
    logger('Update user info saga', err, 'error');
    yield put(error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.UPDATE_USER_INFO, updateUserInfoSaga);
}
