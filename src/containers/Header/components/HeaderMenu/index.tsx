import { FC, Fragment, memo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { closeModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Footer } from 'containers';

import { Button } from 'components';
import { addressWithDots } from 'utils';

import { NavLinks, SocialLinks } from 'containers/Footer/components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';

import { ConnectButton, NewPost } from '..';

import { BnbImg, CopyImg } from 'assets/img/icons';

import 'react-loading-skeleton/dist/skeleton.css';
import s from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  isModal: boolean;
  closeMenu?: () => void;
};

const HeaderMenu: FC<HeaderMenuProps> = ({ isModal, closeMenu }) => {
  const { address, displayName, balance, rates, customUrl, id } = useShallowSelector(
    userSelector.getUser,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disconnect } = useWalletConnectorContext();

  const bnbBalance = new BigNumber(balance.bnb).div(10 ** 18).toFixed(5, 1);
  const cosnftBalance = new BigNumber(balance.cosnft).div(10 ** 18).toFixed(5, 1);
  const recBalance = new BigNumber(balance.rec).div(10 ** 18).toFixed(5, 1);

  const handleCopyToClipboard = () => {
    toast.success('Address was copied to clipboard');
  };

  const handleNavigate = (route: string) => {
    return () => {
      navigate(route);
      if (isModal) dispatch(closeModal());
      else if (closeMenu) closeMenu();
    };
  };

  const handleDisconnect = () => {
    disconnect();
    if (closeMenu) closeMenu();
  };

  return (
    <div className={cn(s.header_menu, !isModal && s.mobile)}>
      {address ? (
        <>
          <div className={isModal ? s.info_block_modal : s.info_block}>
            <div className={s.user}>
              <div className={s.user_info}>
                <div className={s.user_info_name}>{displayName}</div>
                <div className={s.user_info_address}>{addressWithDots(address)}</div>
              </div>
              <CopyToClipboard text={address} onCopy={handleCopyToClipboard}>
                <CopyImg className={s.copy} />
              </CopyToClipboard>
            </div>
          </div>
          <div className={cn(isModal ? s.info_block_modal : s.info_block, s.balances)}>
            <div className={s.balance}>
              <img src={BnbImg} alt="bnb logo" />
              <div>
                <div className={s.balance_title}>Balance</div>
                <div className={s.balance_value}>
                  {new BigNumber(bnbBalance).toString(10)}&nbsp;BNB
                  <div className={s.balance_value_usd}>
                    {rates.bnb && balance.bnb ? (
                      `$ ${new BigNumber(
                        new BigNumber(bnbBalance).times(rates.bnb).toFixed(5, 1),
                      ).toString(10)}`
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={s.balance}>
              <div className={s.default_currency_icon} />
              <div className={s.balance_content}>
                <div className={s.balance_title}>Balance</div>
                <div className={s.balance_value}>
                  {new BigNumber(cosnftBalance).toString(10)}&nbsp;COSNFT
                  <div className={s.balance_value_usd}>
                    {rates.cosnft && balance.cosnft ? (
                      `$ ${new BigNumber(
                        new BigNumber(cosnftBalance).times(rates.cosnft).toFixed(5, 1),
                      ).toString(10)}`
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={s.balance}>
              <div className={s.default_currency_icon} />
              <div className={s.balance_content}>
                <div className={s.balance_title}>Balance</div>
                <div className={s.balance_value}>
                  {new BigNumber(recBalance).toString(10)}&nbsp;REC
                  <div className={s.balance_value_usd}>
                    {rates.rec && balance.rec ? (
                      `$ ${new BigNumber(
                        new BigNumber(recBalance).times(rates.rec).toFixed(5, 1),
                      ).toString(10)}`
                    ) : (
                      <Skeleton width={50} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(isModal ? s.info_block_modal : s.info_block, s.actions)}>
            <Button
              color="default"
              onClick={handleNavigate(routes.profile.link(customUrl || id || '', 'created'))}
            >
              My profile
            </Button>
            <Button color="default" onClick={handleNavigate(routes.profile.edit)}>
              Edit profile
            </Button>
            <Button onClick={handleDisconnect}>Disconnect Wallet</Button>
          </div>
          {!isModal ? (
            <div className={s.header_menu_btn}>
              <NewPost closeMenu={handleNavigate(routes.create.root)} isMobile />
            </div>
          ) : (
            Fragment
          )}
        </>
      ) : (
        <div className={s.header_menu_btns}>
          <NewPost closeMenu={handleNavigate(routes.create.root)} isMobile />
          <ConnectButton />
        </div>
      )}
      {isModal ? (
        <div className={s.footer}>
          <NavLinks handleNavigate={handleNavigate(routes.privacy.root)} isModal={isModal} />
          <SocialLinks isModal={isModal} isGreyLinks />
        </div>
      ) : (
        <Footer className={s.footer} isMobile closeMenu={closeMenu} />
      )}
    </div>
  );
};

export default memo(HeaderMenu);
