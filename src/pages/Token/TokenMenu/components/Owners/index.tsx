import { FC, memo } from 'react';

import { InfoCard } from '@/containers';

import { owners } from './Owners.mock';

import s from './Owners.module.scss';

const Owners: FC = () => {
  return (
    <div className={s.owners}>
      {owners.map((owner, index) => (
        <InfoCard info={owner} key={`${index + 1}`} />
      ))}
    </div>
  );
};

export default memo(Owners);
