import { FC } from 'react';

import cn from 'classnames';

import {
  InstagramGreyImg,
  InstagramImg,
  MediumGreyImg,
  MediumImg,
  PancakeSwapGreyImg,
  PancakeSwapImg,
  TelegramGreyImg,
  TelegramImg,
  TwitterGreyImg,
  TwitterImg,
  YoutubeGreyImg,
  YoutubeImg,
} from 'assets/img/icons/footer';

import s from './SocialLinks.module.scss';

const SocialLinks: FC<{ isModal: boolean }> = ({ isModal }) => (
  <div className={cn(s.social_links, isModal && s.grey_links)}>
    <div className={s.social_links_list}>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        {isModal ? <TwitterGreyImg /> : <TwitterImg />}
      </a>
      <a href="https://web.telegram.org" target="_blank" rel="noreferrer">
        {isModal ? <TelegramGreyImg /> : <TelegramImg />}
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        {isModal ? <InstagramGreyImg /> : <InstagramImg />}
      </a>
      <a href="https://medium.com" target="_blank" rel="noreferrer">
        {isModal ? <MediumGreyImg /> : <MediumImg />}
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        {isModal ? <YoutubeGreyImg /> : <YoutubeImg />}
      </a>
      <a href="https://pancakeswap.finance" target="_blank" rel="noreferrer">
        {isModal ? <PancakeSwapGreyImg /> : <PancakeSwapImg />}
      </a>
    </div>
    <div className={s.copyright}>©2021 Name. All Rights reserved</div>
  </div>
);

export default SocialLinks;
