import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';

import { erc20Abi } from 'config/abi';
import { logger } from 'utils';

import { approve } from '../actions';
import actionTypes from '../actionTypes';

export function* approveSaga({
  type,
  payload: { amount, spender, tokenAddress, web3Provider },
}: ReturnType<typeof approve>) {
  yield put(apiActions.request(type));

  const myAddress: string = yield select(userSelector.getProp('address'));

  try {
    const tokenContract: ContractWeb3 = yield new web3Provider.eth.Contract(
      erc20Abi as AbiItem[],
      tokenAddress,
    );

    const allowance: string = yield call(tokenContract.methods.allowance(myAddress, spender).call);

    if (+allowance < +amount) {
      try {
        yield call(
          tokenContract.methods.approve(
            spender,
            new BigNumber(amount).plus(new BigNumber(allowance)).toString(),
          ).send,
          {
            from: myAddress,
          },
        );
        yield put(apiActions.success(type));
      } catch (e: any) {
        yield put(apiActions.error(type, e));
        logger('Approve token', e);
        toast.error('Something went wrong');
      }
    }
  } catch (err: any) {
    yield put(apiActions.error(type, err));
    logger('Allowance token', err);
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
