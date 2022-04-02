import { FC } from 'react';

import { UserInfo } from './components/UserInfo';

import s from './Profile.module.scss';

export const Profile: FC = () => {
  return (
    <div className={s.profile_wrapper}>
      <UserInfo />
    </div>
  );
};
