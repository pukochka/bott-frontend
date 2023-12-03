import axios from 'axios';

import { useDialog } from '../stores/useDialog';
import { useFMStore } from '../stores/FMStrore';

const instance = axios.create({
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  const data = useFMStore();

  request.params = { token: data.token };
  request.data = { bot_id: data.bot_id, ...request.data };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.loadings[request.url.slice(request.url.lastIndexOf('/') + 1)] = true;

  return request;
});

instance.interceptors.response.use(
  function (response) {
    const data = useFMStore();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.loadings[
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      response.config.url.slice(response.config.url.lastIndexOf('/') + 1)
    ] = false;

    if (!response.data.result || response.status !== 200) {
      data.loadings.index = false;
      data.uploadMenu = false;

      useDialog(
        response.data.message ??
          'Попробуйте перезагрузить страницу - это должно помочь.' +
            '\n' +
            response.config.url
      );

      return Promise.reject('err');
    }

    return response;
  },
  function (error) {
    const data = useFMStore();

    data.uploadMenu = false;

    useDialog('Проверьте подключение к интернету или выключите VPN.');

    return Promise.reject(error);
  }
);

export default instance;
