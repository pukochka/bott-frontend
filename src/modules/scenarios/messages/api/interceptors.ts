import axios from 'axios';
import { config } from '../../config';

import { useDialog } from 'src/utils/use/useDialog';
import { useVectorStore } from '../stores/vector/vectorStore';

console.log();

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
      const message = response.data.message;
      const vector = useVectorStore();

      useDialog(
        message ??
          'Попробуйте перезагрузить страницу - это должно помочь.' +
            '\n' +
            response.config.url
      );

      if (
        response.config.url?.slice(response.config.url.lastIndexOf('/') + 1) ===
        'set-next-message'
      ) {
        if (vector.editCombine) {
          vector.updateCurrentCombine();
        } else {
          try {
            const { message_id } = JSON.parse(response.config.data);

            vector.combineLines = vector.combineLines.filter(
              (item) => item.id !== message_id
            );
          } catch (e) {
            vector.combineLines.pop();
          }
        }
      }

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
