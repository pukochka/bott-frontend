import instance from './instance';

import { useCommandsStore } from '../stores/commandsStore';
import { useDataStore } from '../../messages/stores/data/dataStore';

export async function fetchCommands<Q extends keyof SCCommandQueries>(
  query: Q,
  params?: SCCommandParams<Q>,
  action?: (response: any) => void
) {
  const commands = useCommandsStore();

  try {
    return await instance({
      url: 'v1/bot/routenew/route/' + query,
      data: params,
    }).then((response) => {
      if (action !== void 0) action(response);

      if (query === 'create') {
        /** */

        commands.commands.push(response.data.data);

        /** */
      } else if (query === 'create-with-column') {
        /** */

        commands.commands.push(response.data.data);

        /** */
      } else if (query === 'index') {
        /** */

        commands.commands = response.data.data.filter(Boolean);

        /** */
      }
    });
  } catch (e) {}
}

export async function fetchMessage<Q extends keyof SCMessageQueries>(
  query: Q,
  params?: SCMessageParams<Q>
) {
  const commands = useCommandsStore();
  const data = useDataStore();

  try {
    return await instance({
      url: 'v1/bot/messagenew/message/' + query,
      data: { ...params },
    }).then((response) => {
      if (query === 'types') {
        /** */

        commands.types = response.data.data;
        data.types = response.data.data;

        /** */
      } else if (query === 'colors') {
        /** */

        data.colors = response.data.data;

        /** */
      }
    });
  } catch (e) {}
}
