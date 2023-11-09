import instance from './instance';

import { useDataStore } from '../stores/dataStore';

export async function fetchCommands<Q extends keyof SCCommandQueries>(
  query: Q,
  params?: SCCommandParams<Q>,
  action?: () => void
) {
  const data = useDataStore();

  try {
    return await instance({
      url: '/v1/bot/route/route/' + query,
      data: params,
    }).then((response) => {
      if (query === 'update-route') {
        /** */

        data.commands.push(response.data.data);

        /** */
      } else if (query === 'create') {
        /** */

        data.commands.push(response.data.data);

        /** */
      } else if (query === 'create-with-column') {
        /** */

        data.commands.push(response.data.data);

        /** */
      } else if (query === 'index') {
        /** */

        data.commands = response.data.data;

        /** */
      } else if (query === 'delete') {
        /** */

        if (action !== void 0) action();

        /** */
      }
    });
  } catch (e) {}
}
