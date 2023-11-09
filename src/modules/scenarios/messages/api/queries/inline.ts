import instance from '../interceptors';

import { useStatesStore } from '../../stores/states/statesStore';
import { useVectorStore } from '../../stores/vector/vectorStore';
import { useDataStore } from '../../stores/data/dataStore';

export default async function fetchButtons<Q extends keyof IMQueries>(
  query: Q,
  params?: IMParams<Q>,
  action?: (data: any) => void
) {
  const states = useStatesStore();
  const vector = useVectorStore();
  const data = useDataStore();
  try {
    return await instance({
      url: '/v1/bot/keyboard/inline-keyboard/' + query,
      data: { ...params, menu_id: data.selectedMessage?.inline_menu?.id },
    }).then((response) => {
      /** */
      let data;

      try {
        data = JSON.parse(response.data);
      } catch (e) {}

      if (action !== void 0) action(data);

      /** */
      // else if (params['type'] === 6 && query === 'update-data-and-type') {
      //   /** */
      //
      //   data.scenarioValue = JSON.parse(response.data).data;
      //   vector.deleteConnection('button_id', params['id']);
      //   setTimeout(vector.updateConnections, 10);
      //
      //   /** */
      // } else {
      //   /** */
      //
      //   states.selectedMessage.inline_menu = JSON.parse(response.data).data[0];
      //   vector.deleteConnection('button_id', params['id']);
      //   setTimeout(vector.updateConnections, 10);
      //
      //   /** */
      // }
    });
  } catch (e) {}
}
