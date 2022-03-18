import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { store } from 'store/configureStore';

import App from 'App';
import { ModalsManager } from 'containers';

import { combineProviders } from 'utils';

import { Connect } from 'services';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

const Providers = combineProviders([Connect, [Provider, { store }], BrowserRouter]);

const root = document.getElementById('root');
const app = (
  <Providers>
    <App />
    <ToastContainer closeOnClick />
    <ModalsManager />
  </Providers>
);

ReactDOM.render(app, root);
