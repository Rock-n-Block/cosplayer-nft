import { toast } from 'react-toastify';

import { setLoading } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';

import { logger } from 'utils';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({ type, payload }: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));
  yield put(setLoading(true));

  try {
    const { data } = yield call(baseApi.createToken, payload.formData);
    logger('response data:', data);
    const address: string = yield select(userSelector.getProp('address'));
    const { initial_tx, token } = data;
    if (initial_tx) {
      try {
        yield call(payload.web3Provider.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        yield put(apiActions.success(type));
        yield put(setLoading(false));
        toast.success('You have successfully created your NFT. Please wait for minting');
      } catch (e) {
        logger('Send tx', e);
        yield call(baseApi.removeRejected, { id: token.id || 0, type: 'token' });
        toast.error('Something went wrong');
        yield put(apiActions.error(type, e));
        yield put(setLoading(false));
      }
    } else {
      yield put(apiActions.error(type));
      yield put(setLoading(false));
      toast.error('No initial tx for sending');
    }
  } catch (err) {
    logger('createTokenSaga', err);
    yield put(apiActions.error(type, err));
    yield put(setLoading(false));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}
