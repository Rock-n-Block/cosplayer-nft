import { FC } from 'react';

import cn from 'classnames';

import { RecLogoImg } from 'assets/img/icons';
import { TelegramGreyImg, TelegramImg, TwitterGreyImg, TwitterImg } from 'assets/img/icons/footer';

import s from './SocialLinks.module.scss';

type SocialLinksProps = {
  isModal: boolean;
  isGreyLinks: boolean;
};

const SocialLinks: FC<SocialLinksProps> = ({ isModal, isGreyLinks }) => (
  <div className={cn(s.social_links, isModal && s.grey_links)}>
    <div className={s.social_links_list}>
      <a href="https://twitter.com/rec_token?s=21" target="_blank" rel="noreferrer">
        {isGreyLinks ? <TwitterGreyImg /> : <TwitterImg />}
      </a>
      <a href="https://t.me/rectoken" target="_blank" rel="noreferrer">
        {isGreyLinks ? <TelegramGreyImg /> : <TelegramImg />}
      </a>
      <a href="https://rectoken.finance" target="_blank" rel="noreferrer">
        <RecLogoImg className={cn(s.rec, isGreyLinks ? s.rec_grey : s.rec_blue)} />
      </a>
    </div>
    <div className={!isModal ? s.copyright : ''}>©2022 CosplayerNFT. All Rights reserved</div>
  </div>
);

export default SocialLinks;
