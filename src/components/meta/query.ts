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

export async function fetchSettings(
  host: string,
  query: keyof MessageFreeSettingsQueries,
  data: Record<string, boolean | number | string>,
  token: string,
  handle?: (response: any) => void
) {
  try {
    return await instance({
      url: host + 'v1/bot/message/settings/' + query,
      data: data,
      params: { token },
    }).then((response) => {
      if (handle !== void 0) handle(response.data.data);
    });
  } catch (e) {}
}
