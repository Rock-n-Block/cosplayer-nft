import { FC } from 'react';

import { InfoCard } from 'containers';

import { bids } from './Bids.mock';

import s from './Bids.module.scss';

export const Bids: FC = () => {
  return (
    <div className={s.bids}>
      {bids.map((bid, index) => (
        <InfoCard info={bid} key={`${index + 1}`} />
      ))}
    </div>
  );
};
