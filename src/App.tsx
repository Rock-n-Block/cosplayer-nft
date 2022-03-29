import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, RouterManager } from '@/containers';

const App: FC = () => {
  const location = useLocation();

  return (
    <div className="main_wrapper">
      <Header />
      <div className="page_wrapper">
        <RouterManager />
      </div>
      {location.pathname === '/' && <Footer className="mobile_hidden" />}
    </div>
  );
};
export default App;
