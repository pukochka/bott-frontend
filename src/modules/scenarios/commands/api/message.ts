import instance from './instance';

import { useDataStore } from '../stores/dataStore';

export async function fetchMessage<Q extends keyof SCMessageQueries>(
  query: Q,
  params?: SCMessageParams<Q>
) {
  const data = useDataStore();

  try {
    return await instance({
      url: '/v1/bot/message/message/' + query,
      data: { ...params },
    }).then((response) => {
      if (query === 'types') {
        /** */

        data.types = response.data.data;

        /** */
      }
    });
  } catch (e) {}
}
