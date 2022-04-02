import { FC } from 'react';

import { InfoCard } from 'containers';

import { sales } from './Sales.mock';

import s from './Sales.module.scss';

export const Sales: FC = () => {
  return (
    <div className={s.sales}>
      {sales.map((sale, index) => (
        <InfoCard info={sale} key={`${index + 1}`} />
      ))}
    </div>
  );
};
