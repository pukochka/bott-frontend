import instance from './interseptor';

import { useMainStore } from '../stores/mainStore';

export async function fetchMenu<Q extends keyof RMQueries>(
  query: Q,
  params?: RMParams<Q>
) {
  const main = useMainStore();
  try {
    return await instance({
      url: '/v1/bot/keyboard/reply-keyboard/' + query,
      data: params,
    }).then((response) => {
      /** */

      main.menuValue = JSON.parse(response.data).data[0];

      /** */
    });
  } catch (e) {}
}
