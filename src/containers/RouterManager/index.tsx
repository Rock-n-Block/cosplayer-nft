import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from 'appConstants';

const Home = lazy(() => import('pages/Home').then((module) => ({ default: module.Home })));
const Nft = lazy(() => import('pages/Nft').then((module) => ({ default: module.Nft })));
const Profile = lazy(() => import('pages/Profile').then((module) => ({ default: module.Profile })));
const EditProfile = lazy(() =>
  import('pages/EditProfile').then((module) => ({ default: module.EditProfile })),
);

const RouteManager: FC = () => {
  return (
    <Routes>
      <Route path={routes.home.root} element={<Home />} />
      <Route path={routes.nft.root} element={<Nft />} />
      <Route path={routes.profile.root} element={<Profile />} />
      <Route path={routes.profile.edit} element={<EditProfile />} />
    </Routes>
  );
};

export default RouteManager;
