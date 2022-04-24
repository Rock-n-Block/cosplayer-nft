import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import nftsSelector from 'store/nfts/selectors';

import { InfoCard } from 'containers';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg } from 'assets/img/icons';

import s from './Owners.module.scss';

export const Owners: FC = () => {
  const {
    owners,
    sellers,
    isSelling,
    isAucSelling,
    startAuction,
    endAuction,
    history,
    minimalBid,
  } = useShallowSelector(nftsSelector.getProp('detailedNft'));

  const isStartedAuc = () => {
    if (isAucSelling && startAuction) {
      const timeToStart = new Date(startAuction).getTime() - new Date().getTime();
      return timeToStart < 0;
    }
    return false;
  };

  return (
    <div className={s.owners}>
      {typeof owners === 'undefined' && <Skeleton width={300} height={38} />}
      {Array.isArray(owners) &&
        owners.map((owner, index) => (
          <InfoCard
            type={sellers?.find((seller) => seller.id === owner.id) ? 'offered' : 'Owned'}
            date={
              new Date(
                history?.find((item) => item.method === 'Listing' && item.oldOwner.id === owner.id)
                  ?.date || '',
              )
            }
            key={`${index + 1}`}
            avatar={owner.avatar || DefaultAvatarImg}
            currency={owner.currency.symbol === 'bnb' ? 'bnb' : 'rec'}
            id={owner.id || ''}
            name={owner.customUrl || owner.name || ''}
            price={owner.price}
            quantity={owner.quantity}
          />
        ))}
      {owners && !Array.isArray(owners) && (
        <InfoCard
          // eslint-disable-next-line no-nested-ternary
          type={isSelling ? 'offered' : isAucSelling ? 'auctioned' : 'Owned'}
          avatar={owners.avatar || DefaultAvatarImg}
          id={owners.id || ''}
          name={owners.customUrl || owners.name || ''}
          quantity={owners.quantity}
          price={isAucSelling ? minimalBid || 0 : owners.price}
          currency={owners.currency.symbol === 'bnb' ? 'bnb' : 'rec'}
          date={
            // eslint-disable-next-line no-nested-ternary
            !isAucSelling
              ? isSelling
                ? new Date(
                    history?.find(
                      (item) => item.method === 'Listing' && item.oldOwner.id === owners.id,
                    )?.date || '',
                  )
                : new Date(
                    history?.find((item) => item.method === 'Buy' && item.newOwner.id === owners.id)
                      ?.date || '',
                  )
              : new Date(isStartedAuc() ? endAuction || '' : startAuction || '')
          }
        />
      )}
    </div>
  );
};
