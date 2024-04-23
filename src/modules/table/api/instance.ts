import axios from 'axios';
import { config } from '../config';
import { useDialog } from 'src/utils/use/useDialog';

const instance = axios.create();

instance.interceptors.request.use(function (request) {
  request.params = Object.assign(request.params, config.table.query.params);
  request.data = Object.assign(request.data, config.table.query.data);

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
