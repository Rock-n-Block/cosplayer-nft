import { setNfts, setSearchedUsers } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { TokenFull, User } from 'types';

import { searchNfts } from '../actions';
import actionTypes from '../actionTypes';

export function* searchNftsSaga({ type, payload }: ReturnType<typeof searchNfts>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.searchNfts, payload);

    if (payload.props.type === 'users') {
      const result = camelize(data.items) as User[];
      yield put(setSearchedUsers(result));
    } else {
      const result = camelize(data.items) as TokenFull[];
      yield put(setNfts(result));
    }

    yield put(success(type));
  } catch (e) {
    logger('Search nfts', e);
    yield put(error(type));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_NFTS, searchNftsSaga);
}
