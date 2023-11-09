import instance from '../interceptors';

import { useDataStore } from '../../stores/data/dataStore';
import { useVectorStore } from '../../stores/vector/vectorStore';

export default async function fetchMessage<Q extends keyof SCMessageQueries>(
  query: Q,
  params?: SCMessageParams<Q>,
  action?: (response?: any) => void
) {
  const data = useDataStore();
  const vector = useVectorStore();

  try {
    return await instance({
      url: '/v1/bot/message/message/' + query,
      data: { ...params },
    }).then((response) => {
      if (action !== void 0) action(response);

      if (query === 'colors') {
        /** */

        data.colors = response.data.data ?? [];

        /** */
      } else if (query === 'types') {
        /** */

        data.types = response.data.data ?? [];

        /** */
      } else if (query === 'delete') {
        /** */

        vector.setConnections(response.data.data?.lines ?? []);
        data.scenarioValue = response.data.data;

        /** */
      } else if (query === 'duplicate') {
        /** */

        data.scenarioValue = response.data.data;

        /** */
      }
    });
  } catch (e) {}
}
