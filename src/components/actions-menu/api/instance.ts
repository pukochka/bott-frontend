import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.host,
  method: 'post',
});

instance.interceptors.request.use(function (config) {
  config.params = {
    token: '1172473489:AAFoRo3JvyXS5c1l5aW5qvOtDzZEQVJvf0w',
  };
  return config;
});

instance.interceptors.response.use(
  function (response) {
    if (response.data.result) {
      return Promise.resolve(response);
    }

    return Promise.reject('error');
  },
  function (error) {
    return Promise.reject(error);
  }
);
