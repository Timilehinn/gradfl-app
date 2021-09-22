import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.43.223:5454/cryptolead-api',
    // baseURL: 'https://cryptolead-api.herokuapp.com/cryptolead-api',
    headers: {
      'Content-Type': 'application/json',
    },
});