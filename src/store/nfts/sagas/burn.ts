import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { logger } from 'utils';

import { burn } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* burnSaga({
  type,
  payload: { id, amount, web3Provider },
}: ReturnType<typeof burn>) {
  yield put(apiActions.request(type));

  const userAddress: string = yield select(userSelector.getProp('address'));
  try {
    const { data } = yield call(baseApi.burn, { amount, id });

    yield call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: userAddress,
    });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
      },
    });

    yield put(apiActions.success(type));
    yield put(closeModal());
    toast.success('You have successfully burned an amount of token');
  } catch (err) {
    logger('Burn token', err);
    yield put(apiActions.error(type, err));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BURN, burnSaga);
}
