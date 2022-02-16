import { FC } from 'react';

import { Button } from 'components';

import { SearchImg } from 'assets/img/icons';
import LogoImg from 'assets/img/logo.svg';

import s from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={s.header_wrapper}>
      <div className={s.header_logo}>
        <img src={LogoImg} alt="CosplayerNFT logo" />
      </div>
      <div className={s.header_input}>
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
    </header>
  );
};

export default Header;
