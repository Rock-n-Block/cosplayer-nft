import { ApiUrl } from 'appConstants';
import { GetHotNftsReq, SearchNftReq } from 'types/requests';

import ajax from './ajax';

export default {
  searchNfts({ data, props }: SearchNftReq) {
    return ajax({
      method: 'post',
      url: ApiUrl.searchNfts(props),
      data: { ...data },
    });
  },
  autocompleteHashtag(hashtag: string) {
    return ajax({
      method: 'get',
      url: ApiUrl.autocompleteHashtag(hashtag),
    });
  },
  autocompleteCountry(country: string) {
    return ajax({
      method: 'get',
      url: ApiUrl.autocompleteCountries(country),
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
  patchNftInfo(data: { id: string | number; formData: FormData }) {
    return ajax({
      method: 'patch',
      url: ApiUrl.nftById(data.id),
      data: data.formData,
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
  trackTransaction(data: {
    tx_hash: string;
    token: string | number;
    ownership: string;
    amount: string | number;
  }) {
    return ajax({
      method: 'post',
      url: ApiUrl.trackTransaction,
      data,
    });
  },
  buy(data: { id: string | number; tokenAmount: string | number; sellerId?: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.buy,
      data,
    });
  },
  bid(data: { token_id: number | string; amount: number | string; quantity: string | number }) {
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
  transfer(data: { id: string | number; address: string; amount?: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.transfer(data.id),
      data,
    });
  },
  burn(data: { amount?: string | number; id: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.burn(data.id),
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
  comment(data: { text: string; token_id: string | number }) {
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
  report(data: { message: string; token: string | number }) {
    return ajax({
      method: 'post',
      url: ApiUrl.report,
      data,
    });
  },
  support(data: FormData) {
    return ajax({
      method: 'post',
      url: ApiUrl.support,
      data,
    });
  },
};
