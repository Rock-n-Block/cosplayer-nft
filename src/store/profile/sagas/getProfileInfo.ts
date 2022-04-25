import { updateProfile } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { getProfileById } from '../actions';
import profileActionTypes from '../actionTypes';

export function* getProfileInfoSaga({ type, payload: { id } }: ReturnType<typeof getProfileById>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.getProfileInfo, { id });

    yield put(updateProfile(camelize(data)));

    yield put(success(type));
  } catch (err) {
    logger('Get profile info', err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(profileActionTypes.GET_PROFILE, getProfileInfoSaga);
}
