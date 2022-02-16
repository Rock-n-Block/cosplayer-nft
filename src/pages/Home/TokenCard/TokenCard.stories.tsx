import React from 'react';

import { TokenCard } from './TokenCard';

export default {
  title: 'components/TokenCard',
  component: TokenCard,
};

export const Default: React.FC = () => {
  return (
    <div>
      <TokenCard />
    </div>
  );
};
