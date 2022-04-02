import { FC } from 'react';

import Search from '.';

export default {
  title: 'containers/header/Search',
  component: Search,
};

export const Default: FC = () => (
  <>
    <Search isMobile={false} />
    <br />
    <Search isMobile />
  </>
);
