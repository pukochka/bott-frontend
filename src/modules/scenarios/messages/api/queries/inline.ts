import instance from '../interceptors';

import { useDataStore } from '../../stores/data/dataStore';
import { update, useVectorStore } from '../../stores/vector/vectorStore';

export default async function fetchButtons<Q extends keyof IMQueries>(
  query: Q,
  params?: IMParams<Q>,
  action?: (data: any) => void
) {
  const data = useDataStore();
  const vector = useVectorStore();

  try {
    return await instance({
      url: 'v1/bot/keyboard/inline-new/' + query,
      data: { ...params, menu_id: data.selectedMessage?.menu?.id },
    }).then((response) => {
      /** */

      if (action !== void 0) action(response);

      update();

      /** */
    });
  } catch (e) {}
}
