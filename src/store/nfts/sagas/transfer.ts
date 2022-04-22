import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { addressWithDots, logger } from 'utils';

import { transfer } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* transferSaga({
  type,
  payload: { id, address, amount, web3Provider },
}: ReturnType<typeof transfer>) {
  yield put(apiActions.request(type));

  const userAddress: string = yield select(userSelector.getProp('address'));
  try {
    const { data } = yield call(baseApi.transfer, { id, address, amount });

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
    toast.success(`You have successfully transferred NFT to ${addressWithDots(address)}`);
  } catch (err: any) {
    yield put(apiActions.error(type, err));
    logger('Transfer token', err);
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.TRANSFER, transferSaga);
}
