import { fork } from 'redux-saga/effects';

import getTokenBalance from './getTokenBalance';
import login from './login';
import patchUserInfo from './patchUserInfo';
import updateUserInfo from './updateUserInfo';

export default function* userSagas() {
  yield fork(getTokenBalance);
  yield fork(login);
  yield fork(updateUserInfo);
  yield fork(patchUserInfo);
}
