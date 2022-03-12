export const routes = {
  home: {
    root: '/',
  },
  nft: {
    link: (id: string | number): string => `/nft/${id}`,
    root: '/nft/:id',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
    collection: '/create/collection',
  },
  profile: {
    link: (
      id: string | number,
      tab?: 'for-sale' | 'owned' | 'favorites' | 'about-me' | 'collections' | 'sold' | 'bided',
    ): string => `/profile/${id}${tab ? `/${tab}` : ''}`,
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
  lostPage: {
    root: '/404',
  },
};
