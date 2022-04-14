import { IP_API_KEY } from 'config';

const accountURLs = {
  getIpData: `https://api.ipdata.co?api-key=${IP_API_KEY}`,
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  comment: '/account/comment/',
  like: '/account/self/like/',
  likeComment: '/account/self/like_comment/',
};

const storeURLs = {
  getHotNfts: 'store/hot/',
  getRelatedNfts: (id: string | number) => `/store/related/${id}/`,
  nftById: (id: string | number) => `/store/${id}`,
  getLiked: (id: string | number) => `/store/liked/${id}/`,
  searchNfts: 'store/search/',
  createToken: '/store/create_token/',
  removeRejected: '/store/remove-reject/',
  buy: '/store/buy/',
  bid: '/store/bids/make_bid/',
  getBids: (id: string | number) => `/store/get_bids/${id}/`,
  endAuction: (id: string | number) => `/store/end_auction/${id}/`,
  verificateBet: (id: string | number) => `/store/verificate_bet/${id}/`,
  getFee: '/store/fee/',
  getMaxPrice: '/store/max_price/',
  getTags: '/store/tags/',
  report: '/store/report/',
  support: '/store/support/',
  transfer: (id: string | number) => `/store/transfer/${id}/`,
  burn: (id: string | number) => `/store/${id}/burn/`,
};

const ratesURL = {
  getRates: '/rates/',
};

export default {
  ...storeURLs,
  ...accountURLs,
  ...ratesURL,
};
