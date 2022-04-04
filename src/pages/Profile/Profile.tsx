import { FC } from 'react';

import { Button } from 'components';

import { ProfileNavBar } from './components/ProfileNavBar';
import { UserInfo } from './components/UserInfo';

import { routes } from 'appConstants';

import NftImg from 'assets/img/nft.png';

import s from './Profile.module.scss';

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export const Profile: FC = () => {
  return (
    <div className={s.profile_wrapper}>
      <UserInfo />
      <div className={s.tokens}>
        <ProfileNavBar />
        <div className={s.tokens_list}>
          {list.map((item) => (
            <Button className={s.token} href={routes.nft.link(1)} key={item}>
              <img src={NftImg} alt="nft" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
