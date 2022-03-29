import { IP_API_KEY } from '@/config';

export default {
  getIpData: `https://api.ipdata.co?api-key=${IP_API_KEY}`,
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  commentNft: '/account/comment/',
  getTrendingNfts: 'store/trending/',
  searchNfts: 'store/search/',
  getCategories: '/store/categories/',
  createNewToken: '/store/create_token/',
  getRates: '/rates/',
};
