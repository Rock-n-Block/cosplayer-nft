import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';

import { logger } from 'utils';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({
  type,
  payload: { formData, web3Provider },
}: ReturnType<typeof createToken>) {
  yield put(apiActions.request(type));

  try {
    const { data } = yield call(baseApi.createToken, formData);
    logger('response data:', data);
    const address: string = yield select(userSelector.getProp('address'));
    const { initial_tx, token } = data;
    if (initial_tx) {
      try {
        yield call(web3Provider.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });
        yield put(apiActions.success(type));
        toast.success('You have successfully created your NFT. Please wait for minting');
      } catch (e) {
        logger('Send tx', e);
        yield call(baseApi.removeRejected, { id: token.id || 0, type: 'token' });
        toast.error('Something went wrong');
        yield put(apiActions.error(type, e));
      }
    } else {
      yield put(apiActions.error(type));
      toast.error('No initial tx for sending');
    }
  } catch (err) {
    logger('createTokenSaga', err);
    yield put(apiActions.error(type, err));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}
