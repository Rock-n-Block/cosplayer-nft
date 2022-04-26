import { FC } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useLocation } from 'react-router-dom';

import { Footer, Header, ModalsManager, RouterManager } from 'containers';

import { routes } from './appConstants';
import { Connect } from './services';

import { RECAPTCHA_SITE_KEY } from './config';

const App: FC = () => {
  const location = useLocation();

  return (
    <Connect>
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
        <div className="main_wrapper">
          <Header />
          <div className="page_wrapper">
            <RouterManager />
          </div>
          {(location.pathname === routes.home.root ||
            location.pathname === routes.privacy.root) && <Footer className="mobile_hidden" />}
        </div>
        <ModalsManager />
      </GoogleReCaptchaProvider>
    </Connect>
  );
};

export default App;
