import axios from 'axios';

import { URL } from 'appConstants';

export const getIpData = async () => axios.get(URL.getIpData);
