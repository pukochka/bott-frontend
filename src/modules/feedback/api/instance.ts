import axios from 'axios';
import setting from '../config';

const instance = axios.create({
  baseURL: setting.host + 'v1/bot/message/feedback/',
  method: 'post',
});

instance.interceptors.request.use(function (config) {
  config.params = {
    token: setting.bot.token,
  };
  config.data = {
    ...config.data,
    bot_id: setting.bot.id,
    feedback_id: setting.feedback_id,
  };
  return config;
});

instance.interceptors.response.use(
  function (response) {
    if (JSON.parse(response.data).result === true) {
      return response;
    } else {
      return Promise.reject('error');
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
