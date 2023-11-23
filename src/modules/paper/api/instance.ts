import axios from 'axios';
import { config } from '../config';
import { useDialog } from '../../file-manager/stores/useDialog';

export const instance = axios.create({
  baseURL: config.host,
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  request.params = { token: config.bot.token };
  request.data = {
    bot_id: config.bot.id,
    ...request.data,
  };

  return request;
});

instance.interceptors.response.use(
  function (response) {
    if (!response.data.result) {
      useDialog(
        response.data?.message ?? 'Что-то пошло не так, обратитесь в поддержку.'
      );
      return Promise.reject('error');
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);