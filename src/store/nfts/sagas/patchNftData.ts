import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';

import { logger } from 'utils';

import { patchNftData } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* patchNftDataSaga({ type, payload }: ReturnType<typeof patchNftData>) {
  yield put(request(type));

  try {
    yield call(baseApi.patchNftInfo, payload);

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id: payload.id,
      },
    });

    yield put(success(type));
    yield put(closeModal());
    toast.success('You have successfully changed your NFT data');
  } catch (e) {
    logger('Patch NFT data', e);
    put(error(type));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.PATCH_NFT_DATA, patchNftDataSaga);
}
