import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { Button } from 'components';

import { Footer } from '..';

import { BurgerImg, CloseImg, SearchBlackImg, SearchImg } from 'assets/img/icons';
import LogoImg from 'assets/img/logo.svg';

import s from './Header.module.scss';

const Header: FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className={s.header_wrapper}>
        <Link to="/" className={s.header_logo}>
          <img src={LogoImg} alt="CosplayerNFT logo" />
        </Link>
        <div className={cn(s.search, s.search_hidden)}>
          <img src={SearchImg} alt="search icon" />
          <input type="search" placeholder="Search by user name or hashtag" />
        </div>
        <Button className={s.explore_btn} onClick={() => {}}>
          Explore
        </Button>
        <Button color="blue" className={s.new_post_btn} onClick={() => {}}>
          <div className={s.new_post_btn_content}>
            <div className={s.new_post_btn_content_text}>New post</div>
          </div>
        </Button>
        <Button color="blue" className={s.connect_wallet_btn} onClick={() => {}}>
          Connect wallet
        </Button>
        <div className={s.header_nav}>
          <Button color="default" onClick={() => setSearchOpen(true)}>
            <img src={SearchBlackImg} alt="search black icon" />
          </Button>
          <Button color="default" onClick={() => setOpenMenu(!isOpenMenu)}>
            {isOpenMenu ? (
              <img src={CloseImg} alt="close icon" />
            ) : (
              <img src={BurgerImg} alt="burger icon" />
            )}
          </Button>
        </div>
      </header>
      {isSearchOpen && (
        <div className={s.search_menu}>
          <div className={s.search}>
            <img src={SearchImg} alt="search icon" />
            <input type="search" placeholder="Search by user name or hashtag" />
          </div>
          <Button className={s.search_menu_close} onClick={() => setSearchOpen(false)}>
            <img src={CloseImg} alt="close icon" />
          </Button>
        </div>
      )}
      {isOpenMenu && (
        <div className={s.header_menu}>
          <div color="blue" className={s.header_menu_btns}>
            <Button color="blue" className={s.btn} onClick={() => {}}>
              <div className={s.btn_content}>
                <div className={s.btn_content_text}>New Post</div>
              </div>
            </Button>
            <Button color="blue" className={s.btn}>
              Connect wallet
            </Button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Header;
