import { FC, memo } from 'react';

import cn from 'classnames';

import { SearchImg } from '@/assets/img/icons';

import s from './Search.module.scss';

const Search: FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <div className={cn(s.search, isMobile && s.search_hidden)}>
    <img src={SearchImg} alt="search icon" />
    <input type="search" placeholder="Search by user name or hashtag" />
  </div>
);

export default memo(Search);
