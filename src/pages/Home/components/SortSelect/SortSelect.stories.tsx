import { FC } from 'react';

import { sorts } from '../Categories/Categories.mock';
import { SortSelect } from './SortSelect';

export default {
  title: 'home/SortSelect',
  component: SortSelect,
};

export const Default: FC = () => <SortSelect sorts={sorts} />;
