import { ApiUrl } from 'appConstants';
import { MetamaskLoginReq } from 'types';

import ajax from './ajax';

export default {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: ApiUrl.getMetamaskMessage,
    });
  },
  metamaskLogin(data: MetamaskLoginReq) {
    return ajax({
      method: 'post',
      url: ApiUrl.metamaskLogin,
      data,
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
  getCollections() {
    return ajax({
      method: 'get',
      url: ApiUrl.getCollections,
    });
  },
};
