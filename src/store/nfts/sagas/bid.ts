import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
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

  yield put(apiActions.request(type));

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

    yield call(baseApi.bid, {
      token_id: id,
      amount,
      quantity: '1',
    });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
      },
    });

    yield put(apiActions.success(type));
    yield put(closeModal());
    toast.success('You have successfully mage bid');
  } catch (err: any) {
    if (typeof err === 'number') {
      toast.error(err === 4001 ? 'Operation was rejected' : 'Something went wrong');
    } else {
      toast.error(err.code === 4001 ? 'Operation was rejected' : 'Something went wrong');
    }
    logger('Bid', err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.BID, bidNftSaga);
}
