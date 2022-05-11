import { FC, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getPosted } from 'store/nfts/actions';
import { getProfileById } from 'store/profile/actions';
import { clearProfile } from 'store/profile/reducer';
import profileSelector from 'store/profile/selectors';

import cn from 'classnames';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg, VerifiedImg } from 'assets/img/icons';
import { InstagramGreyImg, TwitterGreyImg } from 'assets/img/icons/footer';

import s from './UserInfo.module.scss';

export const UserInfo: FC = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { avatar, bio, displayName, twitter, instagram, site, country, isVerificated, posted } =
    useShallowSelector(profileSelector.getProfile);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId }));
      dispatch(getPosted({ creator: userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  return (
    <div className={s.info}>
      <div className={s.block}>
        {typeof avatar === 'undefined' ? (
          <Skeleton width={94} height={94} borderRadius="50%" />
        ) : (
          <img src={avatar || DefaultAvatarImg} className={s.avatar} alt="avatar" />
        )}
        {typeof displayName === 'undefined' ? (
          <Skeleton width={100} />
        ) : (
          <div className={s.display_name}>
            {displayName}
            {isVerificated && <img src={VerifiedImg} alt="verified icon" />}
          </div>
        )}
        {typeof country === 'undefined' ? (
          <Skeleton width={100} />
        ) : (
          <div className={s.country}>{country}</div>
        )}
      </div>
      <div className={s.block}>
        <div className={s.block_title}>{posted}</div>
        <div className={s.block_text}>Posted</div>
      </div>
      {bio && (
        <div className={s.block}>
          <div className={s.block_title}>Bio</div>
          <div className={s.block_text}>
            {typeof bio === 'undefined' ? <Skeleton width={100} /> : bio}
          </div>
        </div>
      )}
      {(twitter || instagram || site) && (
        <div className={cn(s.block, s.links)}>
          {twitter && (
            <a
              className={s.link}
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <TwitterGreyImg className={s.link_img} />
              <span className={s.link_name}>
                @{twitter.length > 20 ? `${twitter.slice(0, 19)}...` : twitter}
              </span>
            </a>
          )}
          {instagram && (
            <a
              className={s.link}
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramGreyImg className={s.link_img} />
              <span>@{instagram.length > 20 ? `${instagram.slice(0, 19)}...` : instagram}</span>
            </a>
          )}
          {site && (
            <a className={s.link} href={`https://${site}`} target="_blank" rel="noreferrer">
              <span>Website</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
