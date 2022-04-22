import { updateUserState } from '../reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import userSelector from 'store/user/selectors';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { logger } from 'utils';

import { UsdRate } from 'types';

import { getBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getBalanceSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getBalance>) {
  yield put(request(type));

  const walletAddress: string = yield select(userSelector.getProp('address'));

  const { params, type: networkType } = contracts;
  const { abi: RECAbi, address: RECAddress } = params.REC[networkType];

  try {
    const RECContract: ContractWeb3 = yield new web3Provider.eth.Contract(
      RECAbi as AbiItem[],
      RECAddress,
    );
    const RECDecimals: string = yield call(RECContract.methods.decimals().call);

    if (walletAddress) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const bnbBalance: string = yield call(web3Provider.eth.getBalance, walletAddress);
      const RECBalance: string = yield call(RECContract.methods.balanceOf(walletAddress).call);

      const { data }: { data: UsdRate[] } = yield call(baseApi.getRates);
      const bnbRate: string =
        data.find((item) => item?.symbol && item?.symbol === 'bnb')?.rate || '0';
      const RECRate: string =
        data.find((item) => item?.symbol && item?.symbol === 'rec')?.rate || '0';

      yield put(
        updateUserState({
          balance: {
            bnb: new BigNumber(bnbBalance).div(10 ** 18).toString(10),
            rec: new BigNumber(RECBalance).div(10 ** +RECDecimals).toString(10),
          },
          rates: { bnb: bnbRate, rec: RECRate },
        }),
      );
    }
    yield put(success(type));
  } catch (err) {
    logger('getTokenBalance saga', err, 'error');
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_BALANCE, getBalanceSaga);
}
