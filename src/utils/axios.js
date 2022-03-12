/* eslint-disable arrow-body-style */
import axios from 'axios';
import Config from 'react-native-config';

import Storage from './storage';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15 * 1000,
});

instance.interceptors.request.use(async request => {
  const accessToken = await Storage.getItem('accessToken');

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    request.headers.authorization = accessToken;
  }

  return request;
});

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  },
);

export default instance;
