import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { Button } from 'components';
import { addressWithDots } from 'utils';

import { Explore, NewPost, Search } from './components';

import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';

import { Footer } from '..';

import { BurgerImg, CloseImg, SearchBlackImg, SearchImg } from 'assets/img/icons';
import LogoImg from 'assets/img/logo.svg';

import s from './Header.module.scss';

const Header: FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { address } = useShallowSelector(userSelector.getUser);
  const { disconnect } = useWalletConnectorContext();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setActiveModal({ activeModal: 'ConnectWallet', visible: true }));
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <>
      <header className={s.header_wrapper}>
        <Link to="/" className={s.header_logo}>
          <img src={LogoImg} alt="CosplayerNFT logo" />
        </Link>
        <Search className={cn(s.search, s.search_hidden)} />
        <Explore className={s.explore_btn} />
        <NewPost />
        {address ? (
          <Button onClick={handleDisconnect}>{addressWithDots(address)}</Button>
        ) : (
          <Button color="blue" className={s.connect_wallet_btn} onClick={handleOpenModal}>
            Connect wallet
          </Button>
        )}
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
          <div className={s.search}>
            <img src={SearchImg} alt="search icon" />
            <input type="search" placeholder="Search by user name or hashtag" />
          </div>
          <Button className={s.search_menu_close} onClick={() => setSearchOpen(false)}>
            CloseImg
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
            <Button color="blue" className={s.btn} onClick={handleOpenModal}>
              Connect wallet
            </Button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default memo(Header);
