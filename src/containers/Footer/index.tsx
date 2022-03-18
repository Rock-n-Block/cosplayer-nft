import { FC } from 'react';

import cn from 'classnames';

import { NavLinks, SocialLinks } from './components';

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
      <NavLinks isModal={false} />
      <SocialLinks isModal={false} />
    </footer>
  );
};

export default Footer;
