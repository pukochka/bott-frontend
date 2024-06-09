import instance from '../interceptors';
import { useDataStore } from '../../stores/data/dataStore';
import { update, useVectorStore } from '../../stores/vector/vectorStore';

export default async function fetchColumn<Q extends keyof SCColumnQueries>(
  query: Q,
  params?: SCColumnParams<Q>
) {
  const data = useDataStore();
  const vector = useVectorStore();

  try {
    return await instance({
      url: 'v1/bot/routenew/column/' + query,
      data: params,
    }).then((response) => {
      /** */

      data.scenarioValue = response.data.data;

      update();

      /** */
    });
  } catch (e) {}
}
