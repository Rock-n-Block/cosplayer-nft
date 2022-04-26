import { toast } from 'react-toastify';

import { updateUserState } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal, setActiveModal } from 'store/modals/reducer';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { patchUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* patchUserInfoSaga({ type, payload }: ReturnType<typeof patchUserInfo>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.patchSelfInfo, payload);

    logger('patch response', data);

    if (data?.display_name === 'this display_name is occupied') {
      toast.error('This name is occupied');
      yield put(error(type));
      return;
    }

    if (data?.custom_url[0] === 'user with this custom url already exists.') {
      toast.error('This username is occupied');
      yield put(error(type));
      return;
    }

    if (!camelize(data).avatar) {
      yield put(setActiveModal({ activeModal: 'AvatarRequired' }));
    } else {
      yield put(closeModal());
    }

    yield put(updateUserState({ ...camelize(data) }));

    toast.success('Profile info updated');

    yield put(success(type));
  } catch (e) {
    yield put(error(type, e));
    toast.error('Something went wrong');
    logger('patchUserInfo', e, 'error');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.PATCH_USER_INFO, patchUserInfoSaga);
}
