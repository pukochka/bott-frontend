import axios from 'axios';

import { useDialog } from '../stores/useDialog';
import { useFileStore } from '../stores/fileStore';

const instance = axios.create({
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  const data = useFileStore();

  request.params = { token: data.token };
  request.data = { bot_id: data.bot_id, ...request.data };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.loadings[request.url.slice(request.url.lastIndexOf('/') + 1)] = true;

  return request;
});

instance.interceptors.response.use(
  function (response) {
    const data = useFileStore();

    const section = response.config.url?.slice(
      response.config.url.lastIndexOf('/') + 1
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.loadings[section] = false;

    if (!response.data.result || response.status !== 200) {
      data.loadings.index = false;
      data.uploadMenu = false;

      useDialog(
        response.data.message ??
          'Попробуйте перезагрузить страницу - это должно помочь.'
      );

      return Promise.reject('err');
    }

    return response;
  },
  function (error) {
    const data = useFileStore();

    data.uploadMenu = false;

    useDialog('Проверьте подключение к интернету или выключите VPN.');

    return Promise.reject(error);
  }
);

export default instance;
