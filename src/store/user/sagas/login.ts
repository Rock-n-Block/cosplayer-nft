import { toast } from 'react-toastify';

import { disconnectWalletState, updateUserState } from '../reducer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { error, request, success } from 'store/api/actions';
import { baseApi } from 'store/api/apiRequestBuilder';

import { logger } from 'utils';

import { login, updateUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* loginSaga({
  type,
  payload: { address, providerName, web3Provider },
}: ReturnType<typeof login>) {
  yield put(request(type));
  try {
    const { data: metamaskMessage } = yield call(baseApi.getMetamaskMessage);
    let signedMessage: string;
    if (providerName !== 'MetaMask') {
      const msgLength = new Blob([metamaskMessage]).size;
      let message = `\x19Ethereum Signed Message:\n${msgLength}${metamaskMessage}`;
      message = web3Provider.utils.keccak256(message);
      signedMessage = yield call(web3Provider.eth.personal.sign, message, address, '');
    } else {
      signedMessage = yield call(web3Provider.eth.personal.sign, metamaskMessage, address, '');
    }
    const {
      data: { key },
    } = yield call(baseApi.metamaskLogin, {
      address,
      msg: metamaskMessage,
      signed_msg: signedMessage,
    });

    yield put(
      updateUserState({
        address,
        key,
        provider: providerName,
      }),
    );

    yield put(updateUserInfo({ web3Provider, address }));

    toast.success(`Wallet connected: ${address.slice(0, 5)}...${address.slice(-5)}`);

    yield put(success(type));
  } catch (err) {
    logger('loginSaga', err);
    yield put(error(type, err));
    yield put(disconnectWalletState());
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
