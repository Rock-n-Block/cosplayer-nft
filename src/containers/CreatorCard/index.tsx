import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Button, ImgLoader } from 'components';
import { addressWithDots } from 'utils';

import { routes } from 'appConstants';
import { Creator } from 'types';

import { DefaultAvatarImg, VerifiedImg } from 'assets/img/icons';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './CreatorCard.module.scss';

type CreatorCardProps = {
  creator: Creator;
  handleNavigate: (route: string) => () => void;
};

const CreatorCard: FC<CreatorCardProps> = ({ creator, handleNavigate }) => {
  const { address, avatar, isVerificated, customUrl, country, displayName, id } =
    creator || ({} as Creator);

  return (
    <div className={s.creator_card}>
      <Button
        className={s.owner_logo}
        onClick={handleNavigate(routes.profile.link(customUrl || id || ''))}
      >
        <ImgLoader url={avatar || DefaultAvatarImg} alt="creator avatar" />
      </Button>
      <div className={s.owner_info}>
        {customUrl || displayName || address ? (
          <Button
            className={s.owner_info_name}
            onClick={handleNavigate(routes.profile.link(customUrl || id || ''))}
          >
            {customUrl || displayName || (address && addressWithDots(address))}
            {isVerificated && (
              <img src={VerifiedImg} className={s.owner_info_verified} alt="verified icon" />
            )}
          </Button>
        ) : (
          <Skeleton width={100} height={18} />
        )}
        {typeof country !== 'undefined' ? (
          <Button
            className={s.owner_info_location}
            onClick={handleNavigate(`/search/country/${country}`)}
          >
            {country || 'No country'}
          </Button>
        ) : (
          <Skeleton width={100} height={18} />
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
