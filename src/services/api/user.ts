import axios from 'core/axios';

import { MetamaskLogin } from 'types/api';

export default {
  login: (data: MetamaskLogin) =>
    axios.post('account/metamask_login/', {
      address: data.address,
      signed_msg: data.signedMsg,
      msg: data.msg,
    }),
  getMsg: () => axios.get('account/get_metamask_message/'),
  getMe: () => axios.get(`account/self/`),
  update: (data: any) => {
    return axios.patch(`account/self/`, data);
  },
};
