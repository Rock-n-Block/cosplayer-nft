import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components';

import { BurgerImg, CloseImg, SearchBlackImg } from '@/assets/img/icons';
import LogoImg from '@/assets/img/logo.svg';
import { ConnectButton, Explore, HeaderMenu, NewPost, Search } from './components';

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
        <Search isMobile />
        <Explore className={s.explore_btn} />
        <NewPost isMobile={false} />
        <ConnectButton />
        <div className={s.header_nav}>
          <Button color="default" onClick={() => setSearchOpen(true)}>
            <img src={SearchBlackImg} alt="search black icon" />
          </Button>
          <Button color="default" onClick={() => setOpenMenu(!isOpenMenu)}>
            {isOpenMenu ? <CloseImg /> : <BurgerImg />}
          </Button>
        </div>
      </header>
      {isSearchOpen && (
        <div className={s.search_menu}>
          <Search isMobile={false} />
          <Button className={s.search_menu_close} onClick={() => setSearchOpen(false)}>
            <CloseImg />
          </Button>
        </div>
      )}
      {isOpenMenu && <HeaderMenu isModal={false} />}
    </>
  );
};

export default memo(Header);
