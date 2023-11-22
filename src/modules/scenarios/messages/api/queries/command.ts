import instance from '../interceptors';

import { useDataStore } from '../../stores/data/dataStore';
import { useStatesStore } from '../../stores/states/statesStore';
import { useVectorStore } from '../../stores/vector/vectorStore';

export default async function fetchCommands<Q extends keyof SCCommandQueries>(
  query: Q,
  params?: SCCommandParams<Q>,
  action?: (response?: any) => void
) {
  const data = useDataStore();
  const states = useStatesStore();
  const vector = useVectorStore();

  try {
    return await instance({
      url: 'v1/bot/routenew/route/' + query,
      data: params,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response);
      /** */

      if (query === 'view') {
        /** */

        data.scenarioValue = response.data.data;

        vector.setConnections(response.data.data?.lines ?? []);

        states.initialization.data = true;

        /** */
      }
    });
  } catch (e) {}
}
