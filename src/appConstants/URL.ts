export default {
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  commentNft: '/account/comment/',
  getTrendingNfts: 'store/trending/',
  searchNfts: 'store/search/',
  getCategories: '/store/categories/',
  createNewToken: '/store/create_token/',
};
