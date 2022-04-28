import { toast } from 'react-toastify';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';
import { closeModal } from 'store/modals/reducer';
import nftsSelector from 'store/nfts/selectors';

import { logger } from 'utils';

import { patchNftData } from '../actions';
import actionTypes from '../actionTypes';
import { approveNftSaga } from './approveNft';
import { getNftDataSaga } from './getNftData';

export function* patchNftDataSaga({
  type,
  payload: { id, formData, web3Provider, patchType },
}: ReturnType<typeof patchNftData>) {
  yield put(request(type));

  const { standart } = yield select(nftsSelector.getProp('detailedNft'));

  try {
    if (patchType === 'change-price') {
      yield call(approveNftSaga, {
        type: actionTypes.APPROVE_NFT,
        payload: {
          isSingle: standart === 'ERC721',
          web3Provider,
        },
      });
    }

    yield call(baseApi.patchNftInfo, { id, formData });

    yield call(getNftDataSaga, {
      type: actionTypes.GET_NFT_DATA,
      payload: {
        id,
      },
    });

    yield put(success(type));
    yield put(closeModal());
    toast.success('You have successfully changed your NFT data');
  } catch (e) {
    logger('Patch NFT data', e);
    put(error(type));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.PATCH_NFT_DATA, patchNftDataSaga);
}
