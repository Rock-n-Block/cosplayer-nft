import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { erc20Abi } from 'config/abi';
import { logger } from 'utils';

import { bid } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getNftDataSaga } from './getNftData';

export function* bidNftSaga({
  type,
  payload: { id, currency, amount, web3Provider },
}: ReturnType<typeof bid>) {
  const { params, type: networkType } = contracts;

  yield put(request(type));

  try {
    const exchangeAddress = params.EXCHANGE[networkType].address;
    const tokenAddress = params.REC[networkType].address;

    if (currency !== 'bnb') {
      const tokenContract: ContractWeb3 = yield new web3Provider.eth.Contract(
        erc20Abi as AbiItem[],
        tokenAddress,
      );
      const decimals: string = yield call(tokenContract.methods.decimals().call);

      yield call(approveSaga, {
        type: actionTypes.APPROVE,
        payload: {
          web3Provider,
          amount: new BigNumber(amount).times(10 ** +decimals).toFixed(0, 1),
          spender: exchangeAddress,
          tokenAddress,
        },
      });
    }

    const { data } = yield call(baseApi.bid, {
      token_id: id,
      amount,
      quantity: 1,
    });

    if (data?.error?.length) {
      toast.error(data.error);
      yield put(error(type, data.error));
      return;
    }

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
      },
    });

    yield put(success(type));
    yield put(closeModal());
    toast.success('You have successfully placed a bid');
  } catch (err: any) {
    if (typeof err === 'number') {
      toast.error(err === 4001 ? 'Operation was rejected' : 'Something went wrong');
    } else {
      toast.error(err.code === 4001 ? 'Operation was rejected' : 'Something went wrong');
    }
    logger('Bid', err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BID, bidNftSaga);
}
