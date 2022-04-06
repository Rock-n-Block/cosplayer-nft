import React, { FC } from 'react';

import cn from 'classnames';

import { Button } from 'components';

import { EditProfileTabs } from 'pages/EditProfile';

import s from './EditProfileNavBar.module.scss';

type EditProfileNavBarProps = {
  activeTab: EditProfileTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<EditProfileTabs>>;
};

export const EditProfileNavBar: FC<EditProfileNavBarProps> = ({ activeTab, setActiveTab }) => {
  const handleSetTab = (tab: EditProfileTabs) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <div className={s.tabs}>
      <Button
        color={activeTab === 'edit-profile' ? 'blue' : 'white'}
        className={cn(s.tab, s.tab_left, activeTab === 'edit-profile' && s.active)}
        onClick={handleSetTab('edit-profile')}
      >
        Edit Profile
      </Button>
      <Button
        color={activeTab === 'verify' ? 'blue' : 'white'}
        className={cn(s.tab, s.tab_right, activeTab === 'verify' && s.active)}
        onClick={handleSetTab('verify')}
      >
        Verification
      </Button>
    </div>
  );
};
