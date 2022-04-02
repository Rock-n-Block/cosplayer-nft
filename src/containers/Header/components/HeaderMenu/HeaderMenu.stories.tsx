import { FC } from 'react';

import HeaderMenu from '.';

export default {
  title: 'containers/header/HeaderMenu',
  component: HeaderMenu,
};

export const Default: FC = () => (
  <>
    <HeaderMenu isModal />
    <br />
    <HeaderMenu isModal={false} />
  </>
);
