import axios from 'axios';

import { is_production } from 'config';

import { logger } from '../utils';

const AUTH_TOKEN = `${
  localStorage.getItem('cosplayer_nft_token')
    ? `Token ${localStorage.getItem('cosplayer_nft_token')}`
    : ''
}`;

axios.defaults.baseURL = is_production ? '' : 'https://cosplayer.rocknblock.io/api/v1';

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: AUTH_TOKEN,
    };
    return config;
  },
  (error) => {
    logger('Authorization error:', error);
    return Promise.reject(error);
  },
);

export default axios;
