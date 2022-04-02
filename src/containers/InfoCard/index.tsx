import { FC, memo } from 'react';

import { Button } from 'components';

import { ITokenInfo } from 'types';

import { ShareImg, VerifiedImg } from 'assets/img/icons';

import s from './InfoCard.module.scss';

export interface InfoCardProps {
  info: ITokenInfo;
}

const InfoCard: FC<InfoCardProps> = ({ info }) => {
  return (
    <div className={s.info_card}>
      <div className={s.content}>
        <Button className={s.avatar} onClick={() => {}}>
          <img src={info.user.avatar} alt={`${info.user.name} avatar`} />
        </Button>
        <div className={s.action}>
          <span className={s.action_description}>
            <div className={s.text_blue}>
              {info.price}
              {info.count && ` (${info.count})`}
            </div>
            &nbsp;
            {info.type === 'bid' ? '' : info.type}&nbsp;by&nbsp;
            <div className={s.text_black}>
              {info.user.name}
              {info.user.verified && (
                <img src={VerifiedImg} className={s.verified} alt="verified icon" />
              )}
            </div>
          </span>
          <span className={s.action_time}>
            {info.time ? (
              <>
                ends in&nbsp;<div className={s.text_black}>{info.time.days}</div>&nbsp;day
                {info.time.days !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{info.time.hours}</div>&nbsp;hour
                {info.time.hours !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{info.time.minutes}</div>&nbsp;min
                {info.time.minutes !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{info.time.seconds}</div>&nbsp;sec
                {info.time.seconds !== 1 && 's'}
              </>
            ) : (
              <>at {info.date}</>
            )}
          </span>
        </div>
        {info.isActive && (
          <Button className={s.link} onClick={() => {}}>
            <ShareImg />
          </Button>
        )}
      </div>
      {info.isActive && (
        <Button color="orange" className={s.button} onClick={() => {}}>
          {info.type === 'auctioned' ? 'Bid' : 'Buy'}&nbsp;now
        </Button>
      )}
    </div>
  );
};

export default memo(InfoCard);
