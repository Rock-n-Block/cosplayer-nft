import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/configureStore';

import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

const root = document.getElementById('root');
const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <App />
        <ToastContainer closeOnClick />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, root);
