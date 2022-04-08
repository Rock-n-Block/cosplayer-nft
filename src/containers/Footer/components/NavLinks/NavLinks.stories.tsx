import { FC } from 'react';

import NavLinks from '.';

export default {
  title: 'containers/footer/NavLinks',
  component: NavLinks,
};

export const Default: FC = () => (
  <>
    <NavLinks handleNavigate={() => {}} isModal={false} />
    <br />
    <NavLinks handleNavigate={() => {}} isModal />
  </>
);
