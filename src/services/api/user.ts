import axios from 'core/axios';

type ILogin = {
  address: string;
  signedMsg: string;
  msg: string;
};

export default {
  login: (data: ILogin) =>
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
