import { ChangeEvent, FC, useState } from 'react';

import cn from 'classnames';

import { SearchMenu } from 'containers/Header/components';

import { useClickOutside } from 'hooks';

import { SearchImg } from 'assets/img/icons';

import s from './Search.module.scss';

const Search: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [input, setInput] = useState('');
  const [isOpenSearchMenu, setIsOpenSearchMenu] = useState(false);
  const { ref } = useClickOutside(isOpenSearchMenu, setIsOpenSearchMenu);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') setIsOpenSearchMenu(true);
    else setIsOpenSearchMenu(false);
    setInput(e.target.value);
  };

  const handleCloseMenu = () => setIsOpenSearchMenu(false);

  const clearInput = () => setInput('');

  return (
    <div className={cn(s.search_container, isMobile && s.search_hidden)} ref={ref}>
      <div className={s.search}>
        <img src={SearchImg} alt="search icon" />
        <input
          type="search"
          placeholder="Search by user name or hashtag"
          value={input}
          onChange={handleInput}
        />
      </div>
      {isOpenSearchMenu && (
        <SearchMenu clearInput={clearInput} closeMenu={handleCloseMenu} searchInput={input} />
      )}
    </div>
  );
};

export default Search;
