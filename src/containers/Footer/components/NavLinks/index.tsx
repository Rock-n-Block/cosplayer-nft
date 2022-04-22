import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';

import cn from 'classnames';

import { Button } from 'components';

import { routes } from 'appConstants';

import s from './NavLinks.module.scss';

type NavLinksProps = {
  isModal: boolean;
  handleNavigate: (route: string) => void;
};

const NavLinks: FC<NavLinksProps> = ({ isModal, handleNavigate }) => {
  const dispatch = useDispatch();

  const handleOpenSupport = () => {
    dispatch(setActiveModal({ activeModal: 'SupportTicket' }));
  };

  return (
    <div className={cn(s.nav_links, isModal && s.black_links)}>
      <Button onClick={() => handleNavigate('/')}>Staking Pools</Button>
      <Button onClick={() => handleNavigate(routes.privacy.root)}>Terms & Conditions</Button>
      <Button onClick={() => handleNavigate(routes.privacy.root)}>Disclaimers</Button>
      <Button onClick={handleOpenSupport}>Technical Support</Button>
      <Button onClick={() => handleNavigate(routes.privacy.root)}>Privacy Policy</Button>
      <Button onClick={() => handleNavigate('/')}>About</Button>
    </div>
  );
};

export default NavLinks;
