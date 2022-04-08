import { ApiUrl } from 'appConstants';
import { LoginReq } from 'types';
import { SearchNftReq } from 'types/requests';

import ajax from './ajax';

export const baseApi = {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: ApiUrl.getMetamaskMessage,
    });
  },
  metamaskLogin(data: LoginReq) {
    return ajax({
      method: 'post',
      url: ApiUrl.metamaskLogin,
      data,
    });
  },
  getProfileInfo(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: ApiUrl.getProfileInfo(params.id),
    });
  },
  getSelfInfo() {
    return ajax({
      method: 'get',
      url: ApiUrl.getSelfInfo,
    });
  },
  patchSelfInfo(data: FormData) {
    return ajax({
      method: 'patch',
      url: ApiUrl.getSelfInfo,
      data,
    });
  },
  getRates(network = 'Binance-Smart-Chain') {
    return ajax({
      method: 'get',
      url: `${ApiUrl.getRates}?network=${network}`,
    });
  },
  searchNfts({ items_per_page = 6, ...params }: SearchNftReq) {
    return ajax({
      method: 'get',
      url: ApiUrl.searchNfts,
      params: { ...params, items_per_page },
    });
  },
  createNewToken(formData: FormData) {
    return ajax({
      method: 'POST',
      url: ApiUrl.createNewToken,
      params: formData,
    });
  },
};
