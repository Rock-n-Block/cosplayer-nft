import { IP_API_KEY } from 'config';

import { ISearchProps } from '../types';

const accountURLs = {
  getIpData: `https://api.ipdata.co?api-key=${IP_API_KEY}`,
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  getCollections: '/account/self/collections/',
  comment: '/account/comment/',
  like: '/account/self/like/',
  likeComment: '/account/self/like_comment/',
};

const storeURLs = {
  getHotNfts: 'store/hot/',
  getRelatedNfts: (id: string | number) => `/store/related/${id}/`,
  nftById: (id: string | number) => `/store/${id}/`,
  getLiked: (id: string | number) => `/store/liked/${id}/`,
  autocompleteHashtag: (hashtag: string) => `/store/autocomplete_hashtag/?hashtag=${hashtag}`,
  autocompleteCountries: (country: string) => `/store/autocomplete_countries/?country=${country}`,
  searchNfts: (props: ISearchProps) =>
    `store/search/?${props.type ? `type=${props.type}` : ''}${
      props.orderBy ? `&order_by=${props.orderBy}` : ''
    }${typeof props.onSale !== 'undefined' ? `&on_sale=${props.onSale}` : ''}${
      props.tags ? `&tags=${props.tags}` : ''
    }${props.creator ? `&creator=${props.creator}` : ''}${
      props.owner ? `&owner=${props.owner}` : ''
    }${props.hashtag ? `&hashtag=${props.hashtag}` : ''}${
      props.country ? `&country=${props.country}` : ''
    }${typeof props.sold !== 'undefined' ? `&sold=${props.sold}` : ''}${
      typeof props.bidded !== 'undefined' ? `&bidded=${props.bidded}` : ''
    }`,
  createToken: '/store/create_token/',
  removeRejected: '/store/remove-reject/',
  buy: '/store/buy/',
  trackTransaction: '/store/track_transaction/',
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
