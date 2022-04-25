import { setCountries } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { searchCountries } from '../actions';
import actionTypes from '../actionTypes';

export function* searchCountriesSaga({
  type,
  payload: { country },
}: ReturnType<typeof searchCountries>) {
  yield put(request(type));

  try {
    const { data } = yield call(baseApi.autocompleteCountry, country);

    logger('Search countries data:', data);

    yield put(setCountries(data.countries));

    yield put(success(type));
  } catch (e) {
    logger('Search countries', e);
    yield put(error(type, e));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.SEARCH_COUNTRIES, searchCountriesSaga);
}
