import { FC } from 'react';

import { info } from './Info.mock';

import s from './Info.module.scss';

export const Info: FC = () => {
  return (
    <div className={s.info}>
      <div className={s.info_item}>
        <div className={s.key}>Contract address</div>
        <div className={s.value}>{info.contractAddress}</div>
      </div>
      <div className={s.info_item}>
        <div className={s.key}>Token ID</div>
        <div className={s.value}>{info.tokenID}</div>
      </div>
      <div className={s.info_item}>
        <div className={s.key}>Blockchain</div>
        <div className={s.value}>{info.blockchain}</div>
      </div>
    </div>
  );
};
