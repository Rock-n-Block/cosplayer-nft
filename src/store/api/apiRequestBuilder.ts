import { ApiUrl } from 'appConstants';

import accountApiCalls from './accountApiCalls';
import ajax from './ajax';
import nftApiCalls from './nftApiCalls';
import profileApiCalls from './profileApiCalls';

export const baseApi = {
  getRates(network = 'Binance-Smart-Chain') {
    return ajax({
      method: 'get',
      url: `${ApiUrl.getRates}?network=${network}`,
    });
  },
  getFee() {
    return ajax({
      method: 'get',
      url: ApiUrl.getFee,
    });
  },
  ...accountApiCalls,
  ...profileApiCalls,
  ...nftApiCalls,
};
