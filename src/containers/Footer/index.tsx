import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import cn from 'classnames';

import { NavLinks, SocialLinks } from './components';

import { routes } from 'appConstants';

import LogoImg from 'assets/img/logo.svg';

import s from './Footer.module.scss';

interface FooterProps {
  className?: string;
  isMobile?: boolean;
  closeMenu?: () => void;
}

const Footer: FC<FooterProps> = ({ className, isMobile, closeMenu }) => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    return () => {
      navigate(route);
      if (closeMenu) closeMenu();
    };
  };

  return (
    <footer className={cn(s.footer, className)}>
      <div className={s.description}>
        <img src={LogoImg} alt="CosplayerNFT logo" />
        <div className={s.description_text}>
          The world&apos;s first-ever social media platform built on Binance Smart Chain. Mint, Buy
          and Sell NFTs with only a few clicks.
        </div>
      </div>
      <NavLinks handleNavigate={handleNavigate(routes.privacy.root)} isModal={false} />
      <SocialLinks isModal={false} isGreyLinks={isMobile || false} />
    </footer>
  );
};

export default Footer;
