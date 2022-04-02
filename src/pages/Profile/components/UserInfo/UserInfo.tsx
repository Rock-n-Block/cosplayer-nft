import { FC } from 'react';

import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { useShallowSelector } from 'hooks';

import { DefaultAvatarImg, VerifiedImg } from 'assets/img/icons';
import { InstagramGreyImg, TwitterGreyImg } from 'assets/img/icons/footer';

import s from './UserInfo.module.scss';

export const UserInfo: FC = () => {
  const { avatar, bio, displayName, twitter, instagram, site, country, isVerificated } =
    useShallowSelector(userSelector.getUser);
  return (
    <div className={s.info}>
      <div className={s.block}>
        <img src={avatar || DefaultAvatarImg} className={s.avatar} alt="avatar" />
        <div className={s.display_name}>
          {displayName}
          {isVerificated && <img src={VerifiedImg} alt="verified icon" />}
        </div>
        <div className={s.country}>{country}</div>
      </div>
      <div className={s.block}>
        <div className={s.block_title}>244</div>
        <div className={s.block_text}>Posted</div>
      </div>
      {bio && (
        <div className={s.block}>
          <div className={s.block_title}>Bio</div>
          <div className={s.block_text}>{bio}</div>
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
              <span className={s.link_name}>@{twitter}</span>
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
              <span>@{instagram}</span>
            </a>
          )}
          {site && (
            <a className={s.link} href={site} target="_blank" rel="noreferrer">
              <span>Website</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
