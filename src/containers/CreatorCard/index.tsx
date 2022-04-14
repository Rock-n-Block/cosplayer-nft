import { FC } from 'react';

import { Button } from 'components';
import { addressWithDots } from 'utils';

import { Creator } from 'types';

import { DefaultAvatarImg, VerifiedImg } from 'assets/img/icons';

import s from './CreatorCard.module.scss';

type CreatorCardProps = {
  creator: Creator;
};

const CreatorCard: FC<CreatorCardProps> = ({ creator }) => {
  const { address, avatar, isVerificated, customUrl, country, displayName, id } = creator;
  return (
    <div className={s.creator_card}>
      <Button className={s.owner_logo} href={`/profile/${customUrl || id}`}>
        <img src={avatar || DefaultAvatarImg} alt="creator avatar" />
      </Button>
      <div className={s.owner_info}>
        <div className={s.owner_info_name}>
          {customUrl || displayName || (address && addressWithDots(address))}
          {isVerificated && (
            <img src={VerifiedImg} className={s.owner_info_verified} alt="verified icon" />
          )}
        </div>
        <Button className={s.owner_info_location} onClick={() => {}}>
          {country}
        </Button>
      </div>
    </div>
  );
};

export default CreatorCard;
