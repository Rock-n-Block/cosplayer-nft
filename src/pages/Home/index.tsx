import { FC } from 'react';

import uLogo, { ReactComponent as Logo } from 'assets/img/icons/logo.svg';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.home_wrapper}>
      <div className={s.title}>Hello RnB</div>
      <Logo />
      <img src={uLogo} alt="star" />
    </div>
  );
};
export default Home;
