import { FC } from 'react';

import Explore from '.';

import s from 'containers/Header/Header.module.scss';

export default {
  title: 'containers/header/Explore',
  component: Explore,
};

export const Default: FC = () => <Explore className={s.explore_btn} />;
