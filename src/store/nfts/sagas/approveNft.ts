import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as apiActions from 'store/api/actions';
import userSelector from 'store/user/selectors';

import { ContractWeb3 } from '@amfi/connect-wallet/dist/interface';
import { AbiItem } from 'web3-utils';

import { contracts } from 'config';
import { erc721Abi, erc1155Abi } from 'config/abi';
import { logger } from 'utils';

import { approveNft } from '../actions';
import actionTypes from '../actionTypes';

export function* approveNftSaga({
  type,
  payload: { isSingle, web3Provider },
}: ReturnType<typeof approveNft>) {
  const { params, type: networkType } = contracts;
  yield put(apiActions.request(type));

  const myAddress: string = yield select(userSelector.getProp('address'));

  try {
    const nftAddress = params[isSingle ? 'ERC721' : 'ERC1155'][networkType].address;
    const exchangeAddress = params.EXCHANGE[networkType].address;

    const nftContract: ContractWeb3 = yield new web3Provider.eth.Contract(
      isSingle ? (erc721Abi as AbiItem[]) : (erc1155Abi as AbiItem[]),
      nftAddress,
    );

    const isApproved: boolean = yield call(
      nftContract.methods.isApprovedForAll(myAddress, exchangeAddress).call,
    );

    if (isApproved) {
      yield put(apiActions.success(type));
      return;
    }

    yield call(nftContract.methods.setApprovalForAll(exchangeAddress, true).send, {
      from: myAddress,
    });

    yield put(apiActions.success(type));
  } catch (err: any) {
    logger('Approve NFT', err);
    yield put(apiActions.error(type, err));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE_NFT, approveNftSaga);
}
