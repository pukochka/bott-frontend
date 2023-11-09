import axios from 'axios';

import { useDialog } from '../stores/useDialog';
import { useFMStore } from '../stores/FMStrore';
import { config } from '../config';

const instance = axios.create({
  method: 'post',
  baseURL: config.value.host,
});

instance.interceptors.request.use(function (request) {
  request.params = { token: config.value?.bot?.token };
  request.data = { bot_id: config.value?.bot?.id, ...request.data };

  const data = useFMStore();

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
