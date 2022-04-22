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

type SocialLinksProps = {
  isModal: boolean;
  isGreyLinks: boolean;
};

const SocialLinks: FC<SocialLinksProps> = ({ isModal, isGreyLinks }) => (
  <div className={cn(s.social_links, isModal && s.grey_links)}>
    <div className={s.social_links_list}>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        {isGreyLinks ? <TwitterGreyImg /> : <TwitterImg />}
      </a>
      <a href="https://web.telegram.org" target="_blank" rel="noreferrer">
        {isGreyLinks ? <TelegramGreyImg /> : <TelegramImg />}
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        {isGreyLinks ? <InstagramGreyImg /> : <InstagramImg />}
      </a>
      <a href="https://medium.com" target="_blank" rel="noreferrer">
        {isGreyLinks ? <MediumGreyImg /> : <MediumImg />}
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer">
        {isGreyLinks ? <YoutubeGreyImg /> : <YoutubeImg />}
      </a>
      <a href="https://pancakeswap.finance" target="_blank" rel="noreferrer">
        {isGreyLinks ? <PancakeSwapGreyImg /> : <PancakeSwapImg />}
      </a>
    </div>
    <div className={!isModal ? s.copyright : ''}>©2021 CosplayerNFT. All Rights reserved</div>
  </div>
);

export default SocialLinks;
