import { FC } from 'react';

import { bids } from 'pages/Nft/components/Bids/Bids.mock';

import { currencies } from '../PriceSelector/PriceSelector.mock';
import InfoCard from '.';

export default {
  title: 'containers/InfoCard',
  component: InfoCard,
};

export const Default: FC = () => (
  <InfoCard
    avatar={bids[0].user.avatar}
    date={new Date(bids[0].date || '')}
    type=""
    name="username"
    id="1"
    price={0}
    currency={currencies[0].value}
    quantity={1}
  />
);
