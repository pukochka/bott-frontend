import axios from 'axios';
import config from '../../config';

import { useDataStore } from '../stores/dataStore';
import { useDialog } from 'src/utils/use/useDialog';

const instance = axios.create({
  baseURL: config.host,
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  request.params = { token: config.bot.token };
  request.data = { bot_id: config.bot.id, ...request.data };

  return request;
});

instance.interceptors.response.use(
  function (response) {
    const data = useDataStore();

    data.loading = false;

    if (!response.data.result) {
      useDialog(
        response.data.message ??
          'Попробуйте перезагрузить страницу - это должно помочь.' +
            '\n' +
            response.config.url
      );
      return Promise.reject('error');
    }

    return Promise.resolve(response);
  },
  function (error) {
    useDialog('Проверьте подключение к интернету или выключите VPN.');

    return Promise.reject(error);
  }
);

export default instance;
