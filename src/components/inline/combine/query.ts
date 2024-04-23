import axios from 'axios';

import { useDialog } from 'src/utils/use/useDialog';

const instance = axios.create({
  method: 'post',
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

export async function fetchMessages(
  method: 'index' | 'count',
  host: string,
  token: string,
  data: MessageIndexParams,
  handle?: (response: any) => void
) {
  try {
    console.log({ ...data, limit: 6 });
    return await instance({
      url: host + 'v1/bot/messagenew/message/' + method,
      params: { token },
      data: { ...data, limit: 6 },
    }).then((response: any) => {
      if (handle !== void 0) handle(response.data.data);
    });
  } catch (e) {}
}

interface MessageIndexParams {
  bot_id: number;
  offset: number;
}
