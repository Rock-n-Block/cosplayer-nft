import { FC } from 'react';

import nftsSelector from 'store/nfts/selectors';

import BigNumber from 'bignumber.js/bignumber';
import { InfoCard } from 'containers';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg } from 'assets/img/icons';

import s from './Sales.module.scss';

export const Sales: FC = () => {
  const { history, currency } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const sales = history?.filter((item) => item.method === 'Buy') || [];

  return (
    <div className={s.sales}>
      {sales.map((sale, index) => (
        <InfoCard
          key={`${index + 1}`}
          type="Purchased"
          avatar={sale.newOwner.avatar || DefaultAvatarImg}
          id={sale.newOwner.id || ''}
          name={sale.newOwner.customUrl || ''}
          quantity={sale.amount}
          price={new BigNumber(sale.price).toString(10)}
          currency={currency.symbol === 'bnb' ? 'bnb' : 'rec'}
          date={new Date(sale.date)}
        />
      ))}
    </div>
  );
};
