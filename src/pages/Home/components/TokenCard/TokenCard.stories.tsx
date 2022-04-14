import { FC } from 'react';

import { TokenFull } from 'types';

import { TokenCard } from './TokenCard';

export default {
  title: 'home/TokenCard',
  component: TokenCard,
};

export const Default: FC = () => <TokenCard data={{} as TokenFull & { owners: any }} />;
