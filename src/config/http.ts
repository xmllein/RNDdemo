import axios from 'axios';
import Config from 'react-native-config';
// baseUrl
axios.defaults.baseURL = Config.API_URL;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // Do something with response data
    console.log('response', response.data);
    return response.data;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  },
);
