import instance from './interseptor';

import { useReplyStore } from '../stores/replyStore';

export async function fetchMenu<Q extends keyof RMQueries>(
  query: Q,
  params?: RMParams<Q>,
  action?: (response: any) => void
) {
  const reply = useReplyStore();
  try {
    return await instance({
      url: '/v1/bot/keyboard/reply-keyboard/' + query,
      data: params,
    }).then((response) => {
      /** */

      const data = JSON.parse(response.data).data[0];

      if (action !== void 0) action(data);

      reply.menuValue = data;

      /** */
    });
  } catch (e) {}
}
