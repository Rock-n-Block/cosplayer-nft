import { FC, useState } from 'react';

import { EditProfileForm } from 'forms';

import { EditProfileNavBar } from './components/EditProfileNavBar';
import { Verification } from './components/Verification';

import s from './EditProfile.module.scss';

export type EditProfileTabs = 'edit-profile' | 'verify';

export const EditProfile: FC = () => {
  const [activeTab, setActiveTab] = useState<EditProfileTabs>('edit-profile');

  return (
    <div className={s.edit_profile_wrapper}>
      <EditProfileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'edit-profile' ? <EditProfileForm /> : <Verification />}
    </div>
  );
};
