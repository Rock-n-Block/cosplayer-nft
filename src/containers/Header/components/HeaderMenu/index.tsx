import { FC, memo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import userSelector from '@/store/user/selectors';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Footer } from '@/containers';

import { Button } from '@/components';
import { addressWithDots } from '@/utils';

import { NavLinks, SocialLinks } from '@/containers/Footer/components';

import { useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';

import { BnbImg, CopyImg } from '@/assets/img/icons';
import { ConnectButton, NewPost } from '..';

import s from './HeaderMenu.module.scss';

const HeaderMenu: FC<{ isModal: boolean }> = ({ isModal }) => {
  const { address, displayName, balance, rates } = useShallowSelector(userSelector.getUser);
  const { disconnect } = useWalletConnectorContext();

  const bnbBalance = new BigNumber(balance.bnb).div(10 ** 18).toFixed(5, 1);
  const cosnftBalance = new BigNumber(balance.cosnft).div(10 ** 18).toFixed(5, 1);
  const recBalance = new BigNumber(balance.rec).div(10 ** 18).toFixed(5, 1);

  const handleCopyToClipboard = () => {
    toast.success('Address was copied to clipboard');
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
                    $
                    {new BigNumber(
                      new BigNumber(bnbBalance).times(rates.bnb).toFixed(5, 1),
                    ).toString(10)}
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
                    $
                    {new BigNumber(
                      new BigNumber(cosnftBalance).times(rates.cosnft).toFixed(5, 1),
                    ).toString(10)}
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
                    $
                    {new BigNumber(
                      new BigNumber(recBalance).times(rates.rec).toFixed(5, 1),
                    ).toString(10)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(isModal ? s.info_block_modal : s.info_block, s.actions)}>
            <Button href="/my-profile">My profile</Button>
            <Button href="/edit-profile">Edit profile</Button>
            <Button onClick={disconnect}>Disconnect Wallet</Button>
          </div>
          {!isModal && (
            <div className={s.header_menu_btns}>
              <NewPost isMobile />
            </div>
          )}
        </>
      ) : (
        <div className={s.header_menu_btns}>
          <NewPost isMobile />
          <ConnectButton />
        </div>
      )}
      {isModal ? (
        <div className={s.footer}>
          <NavLinks isModal={isModal} />
          <SocialLinks isModal={isModal} />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default memo(HeaderMenu);
