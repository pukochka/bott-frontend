import axios from 'axios';

export const instance = axios.create({
  method: 'post',
});

instance.interceptors.request.use(function (config) {
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
