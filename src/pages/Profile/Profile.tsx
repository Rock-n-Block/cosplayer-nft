import { FC } from 'react';

import { ProfileNavBar } from './components/ProfileNavBar';
import { UserInfo } from './components/UserInfo';

import s from './Profile.module.scss';

export const Profile: FC = () => {
  return (
    <div className={s.profile_wrapper}>
      <UserInfo />
      <div className={s.profile_tokens}>
        <ProfileNavBar />
      </div>
    </div>
  );
};
