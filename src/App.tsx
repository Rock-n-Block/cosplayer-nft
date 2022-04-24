import { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import actionTypes from './store/user/actionTypes';
import { useDispatch } from 'react-redux';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { Footer, Header, ModalsManager, RouterManager } from 'containers';

import { routes } from './appConstants';
import { Connect } from './services';
import { RequestStatus } from './types';
import { useShallowSelector } from 'hooks';

const App: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { address, avatar, customUrl } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.UPDATE_USER_INFO]: updateUserInfoRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const isUpdateUserInfoSuccess = useMemo(
    () => updateUserInfoRequestStatus === RequestStatus.SUCCESS,
    [updateUserInfoRequestStatus],
  );

  useEffect(() => {
    if (address && customUrl && isUpdateUserInfoSuccess && !avatar) {
      dispatch(setActiveModal({ activeModal: 'AvatarRequired' }));
    } else if (address && isUpdateUserInfoSuccess && !customUrl) {
      dispatch(setActiveModal({ activeModal: 'Login' }));
    } else {
      dispatch(closeModal());
    }
  }, [address, avatar, dispatch, customUrl, isUpdateUserInfoSuccess]);

  return (
    <Connect>
      <div className="main_wrapper">
        <Header />
        <div className="page_wrapper">
          <RouterManager />
        </div>
        {(location.pathname === routes.home.root || location.pathname === routes.privacy.root) && (
          <Footer className="mobile_hidden" />
        )}
      </div>
      <ModalsManager />
    </Connect>
  );
};

export default App;
