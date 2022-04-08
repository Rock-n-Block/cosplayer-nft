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
      <a href="#staking" target="_blank" rel="noreferrer">
        Staking Pools
      </a>
      <a href="#terms" target="_blank" rel="noreferrer">
        Terms & Conditions
      </a>
      <a href="#disclaimer" target="_blank" rel="noreferrer">
        Disclaimers
      </a>
      <Button onClick={handleOpenSupport}>Technical Support</Button>
      <Button onClick={() => handleNavigate(routes.privacy.root)}>Privacy Policy</Button>
      <a href="#about" target="_blank" rel="noreferrer">
        About
      </a>
    </div>
  );
};

export default NavLinks;
