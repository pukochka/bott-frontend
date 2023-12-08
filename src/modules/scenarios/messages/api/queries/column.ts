import instance from '../interceptors';
import { useDataStore } from '../../stores/data/dataStore';

export default async function fetchColumn<Q extends keyof SCColumnQueries>(
  query: Q,
  params?: SCColumnParams<Q>
) {
  const data = useDataStore();

  try {
    return await instance({
      url: 'v1/bot/routenew/column/' + query,
      data: params,
    }).then((response) => {
      /** */

      data.scenarioValue = response.data.data;

      /** */
    });
  } catch (e) {}
}
