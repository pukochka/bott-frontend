import { useDialog } from '../../file-manager/stores/useDialog';
import { instance } from './instance';
import { usePSStore } from '../stores/PSstore';
import { install } from '../utils/create';

export async function fetchFeedback<Q extends keyof FBQueries>(
  query: Q,
  data: FBParams<Q>,
  action?: (response: any) => void
) {
  try {
    return await instance({
      url: 'v1/bot/messagenew/feedback/main/' + query,
      data,
    }).then((response) => {
      /** */
      console.log(response);

      if (action !== void 0) action(response.data.data);
      /** */
    });
  } catch (e) {
    useDialog('Что-то пошло не так, обратитесь в поддержку.');
  }
}

export async function fetchMessage<Q extends keyof SCMessageQueries>(
  query: Q,
  params?: SCMessageParams<Q>,
  action?: (response: any) => void
) {
  try {
    const store = usePSStore();

    return await instance({
      url: 'v1/bot/messagenew/message/' + query,
      data: params,
    }).then((response) => {
      if (action) action(response.data.data);

      if (query === 'get') {
        /** */
        store._message = response.data.data;
        store._feedback = response.data.data.feedback;

        install();
        /** */
      }
    });
  } catch (e) {
    useDialog('Что-то пошло не так, обратитесь в поддержку.');
  }
}
