import { FC } from 'react';

import cn from 'classnames';

import {
  InstagramImg,
  MediumImg,
  PancakeSwapImg,
  TelegramImg,
  TwitterImg,
  YoutubeImg,
} from 'assets/img/icons/footer';
import LogoImg from 'assets/img/logo.svg';

import s from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(s.footer, className)}>
      <div className={s.description}>
        <img src={LogoImg} alt="CosplayerNFT logo" />
        <div className={s.description_text}>
          The world&apos;s first-ever social media platform built on Binance Smart Chain. Mint, Buy
          and Sell NFTs with only a few clicks.
        </div>
      </div>
      <div className={s.nav_links}>
        <a href="#staking" target="_blank" rel="noreferrer">
          Staking Pools
        </a>
        <a href="#terms" target="_blank" rel="noreferrer">
          Terms & Conditions
        </a>
        <a href="#disclaimer" target="_blank" rel="noreferrer">
          Disclaimers
        </a>
        <a className={s.nav_links_hide_link} href="#tech" target="_blank" rel="noreferrer">
          Technical Support
        </a>
        <a href="#privacy" target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        <a href="#about" target="_blank" rel="noreferrer">
          About
        </a>
      </div>
      <div className={s.social_links}>
        <div className={s.social_links_list}>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={TwitterImg} alt="twitter logo" />
          </a>
          <a href="https://web.telegram.org" target="_blank" rel="noreferrer">
            <img src={TelegramImg} alt="telegram logo" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={InstagramImg} alt="instagram logo" />
          </a>
          <a href="https://medium.com" target="_blank" rel="noreferrer">
            <img src={MediumImg} alt="medium logo" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src={YoutubeImg} alt="youtube logo" />
          </a>
          <a href="https://pancakeswap.finance" target="_blank" rel="noreferrer">
            <img src={PancakeSwapImg} alt="pancake swap logo" />
          </a>
        </div>
        <div className={s.copyright}>©2021 Name. All Rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
