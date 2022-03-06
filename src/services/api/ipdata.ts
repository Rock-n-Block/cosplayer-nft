import axios from 'axios';

export default {
  getIpData: () =>
    axios.get(
      'https://api.ipdata.co?api-key=9440a3014b0b37f2a8798536eeb357504e2973ee1fa2a41af5caceab',
    ),
};
