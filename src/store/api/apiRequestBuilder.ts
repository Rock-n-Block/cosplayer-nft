import { URL } from 'appConstants';
import { LoginReq, Token } from 'types';
import { SearchNftReq } from 'types/requests';

import ajax from './ajax';

export const baseApi = {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    });
  },
  metamaskLogin(data: LoginReq) {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data,
    });
  },
  getProfileInfo(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: URL.getProfileInfo(params.id),
    });
  },
  getSelfInfo() {
    return ajax({
      method: 'get',
      url: URL.getSelfInfo,
    });
  },
  patchSelfInfo(data: FormData) {
    return ajax({
      method: 'patch',
      url: URL.getSelfInfo,
      data,
    });
  },
  getRates(network = 'Binance-Smart-Chain') {
    return ajax({
      method: 'get',
      url: `${URL.getRates}?network=${network}`,
    });
  },
  searchNfts({ items_per_page = 6, ...params }: SearchNftReq) {
    return ajax({
      method: 'get',
      url: URL.searchNfts,
      params: { ...params, items_per_page },
    });
  },
  createNewToken(token: Token) {
    return ajax({
      method: 'POST',
      url: URL.createNewToken,
      params: token,
    });
  },
};
