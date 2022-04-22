import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Create, EditProfile, Home, Nft, NotFound, PrivacyPolicy, Profile } from 'pages';

import { routes } from 'appConstants';

const RouteManager: FC = () => {
  return (
    <Routes>
      <Route path={routes.home.root} element={<Home />} />
      <Route path={routes.nft.root} element={<Nft />} />
      <Route path={routes.profile.root} element={<Profile />} />
      <Route path={routes.profile.edit} element={<EditProfile />} />
      <Route path={routes.create.root} element={<Create />} />
      <Route path={routes.privacy.root} element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteManager;
