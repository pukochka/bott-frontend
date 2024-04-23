import axios from 'axios';

const instance = axios.create({
  method: 'get',
});

instance.interceptors.request.use(function (request) {
  return request;
});

instance.interceptors.response.use(
  function (response) {
    if (!response.data.results) {
      return Promise.reject('error');
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export async function fetchUserSearch(
  host: string,
  params: UserSearchParams,
  handle?: (results: Array<any>) => void
) {
  try {
    return await instance({ url: host + 'v2/ajax/bot/user/name', params }).then(
      (response) => {
        if (handle !== void 0) handle(response.data.results);
      }
    );
  } catch (e) {}
}

interface UserSearchParams {
  bot_id: number;
  token: string;
  q: string;
}
