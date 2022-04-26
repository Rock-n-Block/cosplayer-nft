import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, ModalsManager, RouterManager } from 'containers';

import { routes } from './appConstants';
import { Connect } from './services';

const App: FC = () => {
  const location = useLocation();

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
