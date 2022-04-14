import { ApiUrl } from 'appConstants';

import ajax from './ajax';

export default {
  getProfileInfo(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: ApiUrl.getProfileInfo(params.id),
    });
  },
  getLikedNftsById(id: string | number) {
    return ajax({
      method: 'get',
      url: ApiUrl.getLiked(id),
    });
  },
  getRelatedNftsById(id: string | number) {
    return ajax({
      method: 'get',
      url: ApiUrl.getRelatedNfts(id),
    });
  },
};
