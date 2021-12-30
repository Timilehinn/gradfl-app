import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.43.224:5454/v1',
    headers: {
      'Content-Type': 'application/json',
    },
});