import instance from './instance';
import { useFBStore } from '../stores/FBStore';

export async function fetchFeedback<Q extends keyof FBQueries>(
  query: Q,
  params?: FBParams<Q>
) {
  const main = useFBStore();
  try {
    return await instance({
      url: query,
      data: params,
    }).then((response) => {
      /** */

      const data = JSON.parse(response.data).data[0];

      main.setting = data.setting;
      main.questions = data.items ?? [];

      /** */
    });
  } catch (e) {}
}
