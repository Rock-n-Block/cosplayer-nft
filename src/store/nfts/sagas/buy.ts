import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { erc20Abi } from 'config/abi';

import { buy } from '../actions';
import actionTypes from '../actionTypes';
import { approveSaga } from './approve';
import { getNftDataSaga } from './getNftData';

export function* buySaga({
  type,
  payload: { id, amount, tokenAmount, sellerId, currency, web3Provider },
}: ReturnType<typeof buy>) {
  const { params, type: networkType } = contracts;
  yield put(apiActions.request(type));

  const address: string = yield select(userSelector.getProp('address'));
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
          amount: new BigNumber(amount)
            .times(new BigNumber(+tokenAmount || 1))
            .times(10 ** +decimals)
            .toFixed(0, 1),
          spender: exchangeAddress,
          tokenAddress,
        },
      });
    }

    const { data } = yield call(
      baseApi.buy,
      +tokenAmount ? { id, tokenAmount, sellerId } : { id, tokenAmount },
    );

    if (data.initial_tx) {
      const { transactionHash } = yield call(web3Provider.eth.sendTransaction, {
        ...data.initial_tx,
        from: address,
      });

      yield call(baseApi.trackTransaction, {
        tx_hash: String(transactionHash),
        token: id,
        ownership: sellerId,
        amount,
      });

      yield call(getNftDataSaga, {
        type: actionTypes.GET_NFT_DATA,
        payload: {
          id,
        },
      });

      yield put(apiActions.success(type));
      yield put(closeModal());
      toast.success('You have successfully bought token');
    } else {
      yield put(apiActions.error(type));
      toast.error('Something went wrong');
    }
  } catch (e: any) {
    if (typeof e === 'number') {
      toast.error(e === 4001 ? 'You have rejected confirmation' : 'Something went wrong');
    } else {
      toast.error(e.code === 4001 ? 'You have rejected confirmation' : 'Something went wrong');
    }

    yield put(apiActions.error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BUY, buySaga);
}
