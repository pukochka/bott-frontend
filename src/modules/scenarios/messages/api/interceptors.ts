import axios from 'axios';
import { config } from '../../config';

import { useDialog } from '../../../file-manager/stores/useDialog';
import { useVectorStore } from 'scenarios/messages/stores/vector/vectorStore';

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
    if (!response.data.result) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = response.message;

      useDialog(
        message ??
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
