import { FC, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { Footer, Header, RouterManager } from 'containers';

import { Spinner } from './components';

const App: FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Spinner color="blue" size="lg" />}>
      <div className="main_wrapper">
        <Header />
        <div className="page_wrapper">
          <RouterManager />
        </div>
        {location.pathname === '/' && <Footer className="mobile_hidden" />}
      </div>
    </Suspense>
  );
};
export default App;
