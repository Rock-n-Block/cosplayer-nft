import { toast } from 'react-toastify';

import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { deleteComment } from '../actions';
import actionTypes from '../actionTypes';
import { getNftDataSaga } from './getNftData';

export function* deleteCommentSaga({
  type,
  payload: { comment_id, tokenId },
}: ReturnType<typeof deleteComment>) {
  yield put(request(type));

  try {
    yield call(baseApi.deleteComment, { comment_id });

    yield call(getNftDataSaga, { type: actionTypes.GET_NFT_DATA, payload: { id: tokenId } });

    yield put(success(type));
    toast.success('Comment has been removed');
  } catch (e) {
    logger('Delete comment', e);
    yield put(error(type, e));
    toast.error('Something went wrong');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.DELETE_COMMENT, deleteCommentSaga);
}
