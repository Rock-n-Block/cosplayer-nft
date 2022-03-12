import { put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';

import { logger } from 'utils';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));
  logger('web3Provider', web3Provider);
  // const {
  //   abi: tokenAbi,
  //   address: tokenAddress,
  // } = contractsConfig.contracts[ContractsNames.token][isMainnet ? 'mainnet' : 'testnet'];

  // const myAddress = yield select(userSelector.getProp('address'));
  try {
    // const tokenContract = yield (new web3Provider.eth.Contract(tokenAbi, tokenAddress[chain]));

    // const balance = yield call(tokenContract.methods.balanceOf(myAddress).call);

    // yield put(updateBalance(balance));

    yield put(success(type));
  } catch (err) {
    logger('getTokenBalance saga', err, 'error');
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
