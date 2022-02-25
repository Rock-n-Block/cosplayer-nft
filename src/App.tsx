import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, RouterManager } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  const location = useLocation();

  return (
    <WalletConnect>
      <div className="main_wrapper">
        <Header />
        <div className="page_wrapper">
          <RouterManager />
        </div>
        {location.pathname === '/' && <Footer className="mobile_hidden" />}
      </div>
    </WalletConnect>
  );
};
export default App;
