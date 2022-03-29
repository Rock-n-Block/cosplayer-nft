import { FC } from 'react';

import { useDispatch } from 'react-redux';

import cn from 'classnames';

import { Button } from '@/components';
import { setActiveModal } from '@/store/modals/reducer';

import s from './NavLinks.module.scss';

const NavLinks: FC<{ isModal: boolean }> = ({ isModal }) => {
  const dispatch = useDispatch();

  const handleOpenSupport = () => {
    dispatch(setActiveModal({ activeModal: 'SupportTicket', visible: true }));
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
      <Button color="default" onClick={handleOpenSupport}>
        Technical Support
      </Button>
      <a href="#privacy" target="_blank" rel="noreferrer">
        Privacy Policy
      </a>
      <a href="#about" target="_blank" rel="noreferrer">
        About
      </a>
    </div>
  );
};

export default NavLinks;
