import { FC, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import { Footer, Header, ModalsManager, RouterManager } from 'containers';

import { Spinner } from './components';

import { Connect } from './services';
import { useShallowSelector } from 'hooks';

const App: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { address, avatar, displayName } = useShallowSelector(userSelector.getUser);

  useEffect(() => {
    if (address && displayName && !avatar) {
      dispatch(setActiveModal({ activeModal: 'AvatarRequired' }));
    } else if (address && !displayName) {
      dispatch(setActiveModal({ activeModal: 'Login' }));
    } else dispatch(closeModal());
  }, [address, avatar, dispatch, displayName]);

  return (
    <Suspense fallback={<Spinner color="blue" size="lg" />}>
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
    </Suspense>
  );
};
export default App;
