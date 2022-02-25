import { FC } from 'react';

import { Button } from 'components';

import { VerifiedImg } from 'assets/img/icons';
import AvatarImg from 'assets/img/owner-avatar.png';

import s from './CreatorCard.module.scss';

const CreatorCard: FC = () => {
  return (
    <div className={s.creator_card}>
      <Button className={s.owner_logo} onClick={() => {}}>
        <img src={AvatarImg} alt="owner avatar" />
      </Button>
      <div className={s.owner_info}>
        <div className={s.owner_info_name}>
          Jakepaul
          <img src={VerifiedImg} className={s.owner_info_verified} alt="verified icon" />
        </div>
        <Button className={s.owner_info_location} onClick={() => {}}>
          United States of America
        </Button>
      </div>
    </div>
  );
};

export default CreatorCard;
