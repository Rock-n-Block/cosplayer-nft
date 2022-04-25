import { fork } from 'redux-saga/effects';

import getProfile from './getProfileInfo';

export default function* profileSagas() {
  yield fork(getProfile);
}
