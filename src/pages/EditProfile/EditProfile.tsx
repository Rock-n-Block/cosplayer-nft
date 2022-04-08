import { FC, useState } from 'react';

import { EditProfileForm } from 'forms';

import { Switcher } from 'components';

import { Verification } from './components/Verification';

import s from './EditProfile.module.scss';

export const EditProfile: FC = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile');

  return (
    <div className={s.edit_profile_wrapper}>
      <Switcher
        firstTab="Edit Profile"
        secondTab="Verification"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'Edit Profile' ? <EditProfileForm /> : <Verification />}
    </div>
  );
};
