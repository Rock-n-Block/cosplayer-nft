import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/configureStore';

import { ModalsManager } from 'containers';

import { combineProviders } from 'utils';

import { Connect } from 'services';

import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

const Providers = combineProviders([
  Connect,
  [Provider, { store }],
  [PersistGate, { persistor }],
  BrowserRouter,
]);

const root = document.getElementById('root');
const app = (
  <Providers>
    <App />
    <ToastContainer closeOnClick />
    <ModalsManager />
  </Providers>
);

ReactDOM.render(app, root);
