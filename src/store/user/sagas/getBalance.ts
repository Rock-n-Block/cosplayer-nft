import { updateUserState } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { logger } from 'utils';

import { UsdRate } from 'types';

import { getBalance } from '../actions';
import actionTypes from '../actionTypes';

export function* getBalanceSaga({
  type,
  payload: { web3Provider, address: walletAddress },
}: ReturnType<typeof getBalance>) {
  yield put(request(type));

  const { params, type: networkType } = contracts;
  const { abi: COSNFTAbi, address: COSNFTAddress } = params.COSNFT[networkType];
  const { abi: RECAbi, address: RECAddress } = params.REC[networkType];

  try {
    const COSNFTContract: ContractWeb3 = yield new web3Provider.eth.Contract(
      COSNFTAbi as AbiItem[],
      COSNFTAddress,
    );
    const RECContract: ContractWeb3 = yield new web3Provider.eth.Contract(
      RECAbi as AbiItem[],
      RECAddress,
    );
    if (walletAddress) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const bnbBalance: string = yield call(web3Provider.eth.getBalance, walletAddress);
      const COSNFTBalance: string = yield call(
        COSNFTContract.methods.balanceOf(walletAddress).call,
      );
      const RECBalance: string = yield call(RECContract.methods.balanceOf(walletAddress).call);

      const { data }: { data: UsdRate[] } = yield call(baseApi.getRates);
      const bnbRate: string =
        data.find((item) => item?.symbol && item?.symbol === 'bnb')?.rate || '0';
      const COSNFTRate: string =
        data.find((item) => item?.symbol && item?.symbol === 'cosnft')?.rate || '0';
      const RECRate: string =
        data.find((item) => item?.symbol && item?.symbol === 'rec')?.rate || '0';

      yield put(
        updateUserState({
          balance: { bnb: bnbBalance, cosnft: COSNFTBalance, rec: RECBalance },
          rates: { bnb: bnbRate, cosnft: COSNFTRate, rec: RECRate },
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
