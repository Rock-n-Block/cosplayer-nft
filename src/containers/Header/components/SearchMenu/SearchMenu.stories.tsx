import { FC } from 'react';

import SearchMenu from '.';

export default {
  title: 'containers/header/SearchMenu',
  component: SearchMenu,
};

export const Default: FC = () => <SearchMenu closeMenu={() => {}} searchInput="ttt" />;
