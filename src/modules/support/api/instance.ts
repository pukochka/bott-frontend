import axios from 'axios';
import { config } from '../config';
import { useDialog } from 'src/utils/use/useDialog';

export const instance = axios.create({
  baseURL: config.host,
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  request.params = { token: config.bot.token };

  request.data = Object.assign(request.data ?? {}, {
    bot_id: config.bot.id,
    id: config.id,
  });

  return request;
});

instance.interceptors.response.use(
  function (response) {
    const result =
      'result' in response.data
        ? response.data.result
        : response.data.results.length;

    if (!result) {
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
