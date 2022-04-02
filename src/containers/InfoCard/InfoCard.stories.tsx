import { FC } from 'react';

import { bids } from 'pages/Nft/components/Bids/Bids.mock';
import { owners } from 'pages/Nft/components/Owners/Owners.mock';
import { sales } from 'pages/Nft/components/Sales/Sales.mock';

import InfoCard from '.';

export default {
  title: 'containers/InfoCard',
  component: InfoCard,
};

export const Default: FC = () => (
  <>
    <InfoCard info={bids[0]} />
    <br />
    <InfoCard info={sales[0]} />
    <br />
    <InfoCard info={owners[0]} />
  </>
);
