import { FC } from 'react';

import { Creator } from 'types';

import CreatorCard from '.';

export default {
  title: 'containers/CreatorCard',
  component: CreatorCard,
};

export const Default: FC = () => <CreatorCard creator={{} as Creator} />;
