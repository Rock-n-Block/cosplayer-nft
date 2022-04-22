import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Button, ImgLoader } from 'components';
import { addressWithDots } from 'utils';

import { Creator } from 'types';

import { DefaultAvatarImg, VerifiedImg } from 'assets/img/icons';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './CreatorCard.module.scss';

type CreatorCardProps = {
  creator: Creator;
};

const CreatorCard: FC<CreatorCardProps> = ({ creator }) => {
  const { address, avatar, isVerificated, customUrl, country, displayName, id } =
    creator || ({} as Creator);
  return (
    <div className={s.creator_card}>
      <Button className={s.owner_logo} href={`/profile/${customUrl || id}`}>
        <ImgLoader url={avatar || DefaultAvatarImg} alt="creator avatar" />
      </Button>
      <div className={s.owner_info}>
        {customUrl || displayName || address ? (
          <div className={s.owner_info_name}>
            {customUrl || displayName || (address && addressWithDots(address))}
            {isVerificated && (
              <img src={VerifiedImg} className={s.owner_info_verified} alt="verified icon" />
            )}
          </div>
        ) : (
          <Skeleton width={100} height={18} />
        )}
        {typeof country !== 'undefined' ? (
          <Button className={s.owner_info_location} onClick={() => {}}>
            {country || 'Russia'}
          </Button>
        ) : (
          <Skeleton width={100} height={18} />
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
