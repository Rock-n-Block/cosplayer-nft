import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import userSelector from 'store/user/selectors';

import { EditProfileForm } from 'forms';

import { Switcher } from 'components';

import { Verification } from './components/Verification';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import s from './EditProfile.module.scss';

export const EditProfile: FC = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile');
  const navigate = useNavigate();
  const address = useShallowSelector(userSelector.getProp('address'));

  useEffect(() => {
    if (!address) {
      navigate(routes.home.root);
    }
  }, [address, navigate]);

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
