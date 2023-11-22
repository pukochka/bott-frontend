import axios from 'axios';
import config from '../../config';

import { useCommandsStore } from '../stores/commandsStore';
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
    const commands = useCommandsStore();

    commands.loading = false;

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
    useDialog('Попробуйте перезагрузить страницу - это должно помочь.');

    return Promise.reject(error);
  }
);

export default instance;
