import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from 'store/configureStore';

import App from 'App';

import { combineProviders } from 'utils';

import { Connect } from 'services';

import 'styles/index.scss';

const Providers = combineProviders([Connect, [Provider, { store }], BrowserRouter]);

const root = document.getElementById('root');
const app = (
  <Providers>
    <App />
  </Providers>
);

ReactDOM.render(app, root);
