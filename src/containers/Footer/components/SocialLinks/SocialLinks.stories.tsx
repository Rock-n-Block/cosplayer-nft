import { FC } from 'react';

import SocialLinks from '.';

export default {
  title: 'containers/footer/SocialLinks',
  component: SocialLinks,
};

export const Default: FC = () => (
  <>
    <SocialLinks isModal={false} />
    <br />
    <SocialLinks isModal />
  </>
);
