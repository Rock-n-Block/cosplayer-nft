import axios from 'axios';

import { ApiUrl } from '@/appConstants';

export const getIpData = async () => axios.get(ApiUrl.getIpData);
