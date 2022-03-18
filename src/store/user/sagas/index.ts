import { fork } from 'redux-saga/effects';

import getBalance from './getBalance';
import login from './login';
import patchUserInfo from './patchUserInfo';
import updateUserInfo from './updateUserInfo';

export default function* userSagas() {
  yield fork(getBalance);
  yield fork(login);
  yield fork(updateUserInfo);
  yield fork(patchUserInfo);
}
