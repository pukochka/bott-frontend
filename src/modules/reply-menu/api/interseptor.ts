import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: config.host,
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  request.params = { token: config.bot.token };
  request.data = {
    bot_id: config.bot.id,
    menu_id: config.menu_id,
    ...request.data,
  };

  return request;
});

instance.interceptors.response.use(
  function (response) {
    let jsonData = false;

    try {
      jsonData = JSON.parse(response.data)?.result;
    } catch (e) {}

    if (!jsonData) {
      return Promise.reject('error');
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
