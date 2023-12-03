import axios from 'axios';

import { useInlineStore } from '../stores/inlineStore';
import { useDialog } from '../../file-manager/stores/useDialog';

const instance = axios.create({
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  const inline = useInlineStore();

  request.params = { token: inline.token };
  request.data = {
    bot_id: inline.bot_id,
    menu_id: inline.inlineMenu?.id,
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

export default instance;
