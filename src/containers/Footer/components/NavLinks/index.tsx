import { FC } from 'react';

import cn from 'classnames';

import s from './NavLinks.module.scss';

const NavLinks: FC<{ isModal: boolean }> = ({ isModal }) => (
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
    <a href="#tech" target="_blank" rel="noreferrer">
      Technical Support
    </a>
    <a href="#privacy" target="_blank" rel="noreferrer">
      Privacy Policy
    </a>
    <a href="#about" target="_blank" rel="noreferrer">
      About
    </a>
  </div>
);

export default NavLinks;
