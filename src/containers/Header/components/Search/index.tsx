import { FC, memo } from 'react';

import { SearchImg } from 'assets/img/icons';

type SearchProps = {
  className: string;
};

const Search: FC<SearchProps> = ({ className }) => (
  <div className={className}>
    <img src={SearchImg} alt="search icon" />
    <input type="search" placeholder="Search by user name or hashtag" />
  </div>
);

export default memo(Search);
