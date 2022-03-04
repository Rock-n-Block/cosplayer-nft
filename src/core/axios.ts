import axios from 'axios';

import { is_production } from 'config';

const AUTH_TOKEN = `${
  localStorage.getItem('cosplayer_nft_token')
    ? `Token ${localStorage.getItem('cosplayer_nft_token')}`
    : ''
}`;

axios.defaults.baseURL = is_production ? '' : 'https://cosplayer.rocknblock.io/api/v1';

axios.defaults.headers.common.Authorization = AUTH_TOKEN;

export default axios;
