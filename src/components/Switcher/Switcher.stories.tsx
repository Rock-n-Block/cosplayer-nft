import { FC, useState } from 'react';

import Switcher from './index';

export default {
  title: 'components/Switcher',
  component: Switcher,
};

export const Default: FC = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile');

  return (
    <Switcher
      firstTab="Edit Profile"
      secondTab="Verification"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};
