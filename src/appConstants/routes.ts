import { ProfileNavbarTabs } from 'types';

export const routes = {
  home: {
    root: '/',
  },
  search: {
    root: '/search/:key/:value',
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
    link: (id: string, tab?: ProfileNavbarTabs): string => `/profile/${id}?tab=${tab || 'created'}`,
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
  privacy: {
    root: '/privacy-policy',
  },
  lostPage: {
    root: '/404',
  },
};
