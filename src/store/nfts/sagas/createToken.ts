import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { logger } from 'utils';

import { createToken } from '../actions';
import actionTypes from '../actionTypes';

export function* createTokenSaga({
  type,
  payload: { formData, web3Provider },
}: ReturnType<typeof createToken>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.createToken, formData);
    logger('response data:', data);

    if (data.name === 'name already used') {
      toast.error('This name is already used');
      yield put(error(type));
      return;
    }

    const address: string = yield select(userSelector.getProp('address'));
    const { initial_tx, token } = data;

    if (initial_tx) {
      try {
        yield call(web3Provider.eth.sendTransaction, {
          ...initial_tx,
          from: address,
        });

        yield put(setActiveModal({ activeModal: 'MintSuccess', props: { tokenId: token.id } }));

        yield put(success(type));
      } catch (e) {
        logger('Send tx', e);
        yield call(baseApi.removeRejected, { id: token.id || 0, type: 'token' });
        toast.error('Something went wrong');
        yield put(error(type, e));
      }
    } else {
      yield put(error(type));
      toast.error('No initial tx for sending');
    }
  } catch (err) {
    logger('createTokenSaga', err);
    yield put(error(type, err));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.CREATE_TOKEN, createTokenSaga);
}
