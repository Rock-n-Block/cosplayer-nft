import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './TokenCardSkeleton.module.scss';

const TokenCardSkeleton: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.creator}>
        <Skeleton circle height={32} width={32} />
        <div className={s.creator_info}>
          <Skeleton width={100} />
          <Skeleton width={100} />
        </div>
      </div>
      <Skeleton width={310} height={307} className={s.image} />
      <div className={s.info}>
        <div className={s.row}>
          <Skeleton width={100} />
          <div className={s.price}>
            <Skeleton width={150} />
            <Skeleton width={70} />
          </div>
        </div>
        <div className={s.footer}>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <div className={s.owner}>
            <Skeleton circle height={14} width={14} />
            <Skeleton width={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCardSkeleton;
