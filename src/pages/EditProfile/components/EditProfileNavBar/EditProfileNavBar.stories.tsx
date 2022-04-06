import { FC, useState } from 'react';

import { EditProfileTabs } from 'pages/EditProfile';

import { EditProfileNavBar } from './EditProfileNavBar';

export default {
  title: 'edit-profile/EditProfileNavBar',
  component: EditProfileNavBar,
};

export const Default: FC = () => {
  const [activeTab, setActiveTab] = useState<EditProfileTabs>('edit-profile');

  return <EditProfileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />;
};
