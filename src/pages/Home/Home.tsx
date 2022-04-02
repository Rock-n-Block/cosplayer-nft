import { FC } from 'react';

import { Categories } from './components/Categories';
import { TokenCard } from './components/TokenCard';

import s from './Home.module.scss';

const tokens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

export const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <Categories />
      <div className={s.token_cards}>
        {tokens.map((token) => (
          <TokenCard key={token} />
        ))}
      </div>
    </div>
  );
};
