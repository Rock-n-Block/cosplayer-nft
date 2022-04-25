import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';
import nftsSelector from 'store/nfts/selectors';
import userSelector from 'store/user/selectors';

import { logger } from 'utils';

import { endAuction } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* endAuctionSaga({
  type,
  payload: { id, web3Provider },
}: ReturnType<typeof endAuction>) {
  yield put(request(type));

  const { address, id: sellerId } = yield select(userSelector.getUser);
  const { highestBid } = yield select(nftsSelector.getProp('detailedNft'));

  try {
    const { data } = yield call(baseApi.endAuction, id);

    if (data.initial_tx) {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...data.initial_tx,
        from: address,
      });

      yield call(baseApi.trackTransaction, {
        tx_hash: String(transactionHash),
        token: id,
        ownership: sellerId,
        amount: highestBid.amount,
      });

      yield call(getNftDataSaga, {
        type: actionTypes.GET_NFT_DATA,
        payload: {
          id,
        },
      });

      yield put(success(type));
      yield put(closeModal());
      toast.success('You have successfully ended your auction');
    } else {
      yield put(error(type));
      toast.error('No initial_tx for transaction');
    }
  } catch (e) {
    yield put(error(type, e));
    logger('End auction', e);
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.END_AUCTION, endAuctionSaga);
}
