import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import nftsSelector from 'store/nfts/selectors';

import { ImgLoader } from 'components';

import { useShallowSelector } from 'hooks';

import { ActionSelect } from '../ActionSelect';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './TokenPreview.module.scss';

export const TokenPreview: FC = () => {
  const { media = '', animation, format } = useShallowSelector(nftsSelector.getProp('detailedNft'));

  return (
    <div className={s.token_preview}>
      {format === 'image' &&
        (media ? (
          <ImgLoader
            width={300}
            height={300}
            url={media}
            alt="token preview"
            className={s.token_image}
          />
        ) : (
          <Skeleton width={300} height={300} />
        ))}
      {format === 'audio' &&
        (media && animation ? (
          <div className={s.token_preview_with_audio}>
            <img src={media} className={s.token_image} alt="audio token preview" />
            <audio className={s.token_audio} controls autoPlay>
              <source src={animation} />
              <track kind="captions" />
            </audio>
          </div>
        ) : (
          <Skeleton width={300} height={300} />
        ))}
      {format === 'video' &&
        (media && animation ? (
          <video autoPlay controls className={s.token_video} poster={media}>
            <source src={animation} />
            <track kind="captions" />
          </video>
        ) : (
          <Skeleton width={300} height={300} />
        ))}
      <ActionSelect />
    </div>
  );
};
