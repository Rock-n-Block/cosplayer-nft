import { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import actionTypes from './store/user/actionTypes';
import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { Footer, Header, ModalsManager, RouterManager } from 'containers';

import { Connect } from './services';
import { RequestStatus } from './types';
import { useShallowSelector } from 'hooks';

const App: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { address, avatar, displayName } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.PATCH_USER_INFO]: patchUserInfoRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const isPatchUserInfoSuccess = useMemo(
    () => patchUserInfoRequestStatus === RequestStatus.SUCCESS,
    [patchUserInfoRequestStatus],
  );

  useEffect(() => {
    if (address && displayName && isPatchUserInfoSuccess && !avatar) {
      dispatch(setActiveModal({ activeModal: 'AvatarRequired' }));
    } else if (address && isPatchUserInfoSuccess && !displayName) {
      dispatch(setActiveModal({ activeModal: 'Login' }));
    }
  }, [address, avatar, dispatch, displayName, isPatchUserInfoSuccess]);

  return (
    <Connect>
      <div className="main_wrapper">
        <Header />
        <div className="page_wrapper">
          <RouterManager />
        </div>
        {location.pathname === '/' && <Footer className="mobile_hidden" />}
      </div>
      <ModalsManager />
    </Connect>
  );
};

export default App;
