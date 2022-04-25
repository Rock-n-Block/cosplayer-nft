import { FC } from 'react';

import nftsSelector from 'store/nfts/selectors';

import { InfoCard } from 'containers';

import { useShallowSelector } from 'hooks';

import s from './Bids.module.scss';

export const Bids: FC = () => {
  const { bids } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  return (
    <div className={s.bids}>
      {bids?.map(
        (bid) =>
          bid.state === 'Committed' && (
            <InfoCard
              type=""
              avatar={bid.bidderAvatar}
              id={String(bid.bidderId)}
              name={bid.bidder}
              quantity={bid.quantity}
              price={bid.amount}
              currency={bid.currency.symbol === 'bnb' ? 'bnb' : 'rec'}
            />
          ),
      )}
    </div>
  );
};
