import { ApiUrl } from 'appConstants';
import { GetHotNftsReq, SearchNftReq } from 'types/requests';

import ajax from './ajax';

export default {
  searchNfts({ ...data }: SearchNftReq) {
    return ajax({
      method: 'post',
      url: ApiUrl.searchNfts,
      data: { ...data },
    });
  },
  getHotNfts({ sort, tag }: GetHotNftsReq) {
    return ajax({
      method: 'get',
      url: `${ApiUrl.getHotNfts}${sort ? `?sort=${sort}` : ''}${
        tag && tag !== 'All' ? `&tag=${tag}` : ''
      }`,
    });
  },
  getNftInfo(id: string | number) {
    return ajax({
      method: 'get',
      url: ApiUrl.nftById(id),
    });
  },
  patchNftInfo(id: string | number, formData: FormData) {
    return ajax({
      method: 'patch',
      url: ApiUrl.nftById(id),
      data: formData,
    });
  },
  createToken(formData: FormData) {
    return ajax({
      method: 'post',
      url: ApiUrl.createToken,
      data: formData,
    });
  },
  removeRejected(data: { id: string | number; type: string }) {
    return ajax({
      method: 'post',
      url: ApiUrl.removeRejected,
      data,
    });
  },
  buy(data: { id: string | number; tokenAmount?: string | number; sellerId?: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.buy,
      data,
    });
  },
  bid(data: { token_id: number | string; amount: number | string; quantity: string }) {
    return ajax({
      method: 'post',
      url: ApiUrl.bid,
      data,
    });
  },
  endAuction(id: string | number) {
    return ajax({
      method: 'post',
      url: ApiUrl.endAuction(id),
    });
  },
  verificateBet(id: number | string) {
    return ajax({
      method: 'get',
      url: ApiUrl.verificateBet(id),
    });
  },
  transfer(id: string | number, data: { address: string; amount?: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.transfer(id),
      data,
    });
  },
  burn(id: string | number, data: { amount?: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.burn(id),
      data,
    });
  },
  like(data: { id: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.like,
      data,
    });
  },
  likeComment(data: { id: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.likeComment,
      data,
    });
  },
  comment(data: { text: string; id: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.comment,
      data,
    });
  },
  deleteComment(data: { comment_id: string | number }) {
    return ajax({
      method: 'delete',
      url: ApiUrl.comment,
      data,
    });
  },
};
