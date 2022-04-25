import { setHashtags } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';
import { camelize } from 'utils/camelize';

import { searchHashtags } from '../actions';
import actionTypes from '../actionTypes';

export function* searchHashtagsSaga({
  type,
  payload: { hashtag },
}: ReturnType<typeof searchHashtags>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.autocompleteHashtag, hashtag);

    yield put(setHashtags(camelize(data.hashtags)));

    yield put(success(type));
  } catch (e) {
    logger('Search hashtags', e);
    put(error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_HASHTAGS, searchHashtagsSaga);
}
