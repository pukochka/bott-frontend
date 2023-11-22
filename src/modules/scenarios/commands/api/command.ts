import instance from './instance';

import { useCommandsStore } from '../stores/commandsStore';

export async function fetchCommands<Q extends keyof SCCommandQueries>(
  query: Q,
  params?: SCCommandParams<Q>,
  action?: () => void
) {
  const commands = useCommandsStore();

  try {
    return await instance({
      url: 'v1/bot/routenew/route/' + query,
      data: params,
    }).then((response) => {
      if (query === 'update-route') {
        /** */

        commands.commands.push(response.data.data);

        /** */
      } else if (query === 'create') {
        /** */

        commands.commands.push(response.data.data);

        /** */
      } else if (query === 'create-with-column') {
        /** */

        commands.commands.push(response.data.data);

        /** */
      } else if (query === 'index') {
        /** */

        commands.commands = response.data.data;

        /** */
      } else if (query === 'delete') {
        /** */

        if (action !== void 0) action();

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

  try {
    return await instance({
      url: 'v1/bot/messagenew/message/' + query,
      data: { ...params },
    }).then((response) => {
      if (query === 'types') {
        /** */

        commands.types = response.data.data;

        /** */
      }
    });
  } catch (e) {}
}
