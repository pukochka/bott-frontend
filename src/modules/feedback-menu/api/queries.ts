import { instance } from './instance';
import { useFeedbackStore } from '../stores/feedbackStore';
import { install, update } from '../utils/create';

const beforeAction: Array<keyof FBMainQueries> = [];
const afterAction: Array<keyof FBMainQueries> = [
  'delete-input',
  'set-start-input',
  'create-input',
  'add-crossroad-option',
  'create-input-before',
];
const notNullable: Array<keyof FBMainQueries> = [
  'update-select-option',
  'update-crossroad-option',
  'delete-crossroad-option',
  'add-select-option',

  'update-input',
  'update-input-text',
  'update-input-select',
  'update-input-file',
  'up-select-option',
  'down-select-option',
  'down-crossroad-option',
  'up-crossroad-option',
  'delete-select-option',
];

export async function fetchFeedback<Q extends keyof FBMainQueries>(
  query: Q,
  data?: FBMainParams<Q>,
  action?: (response: any, original: any) => void
) {
  try {
    const store = useFeedbackStore();

    return await instance({
      url: 'v1/bot/messagenew/feedback/main/' + query,
      data,
    }).then((response) => {
      /** */

      if (beforeAction.includes(query)) {
        store._feedback = response.data.data.feedback;
        store.selectedMessage = null;

        update();
      }

      if (notNullable.includes(query)) {
        store._feedback = response.data.data.feedback;

        update();
      }

      /** */

      if (action !== void 0) action(response.data.data, response);

      /** */

      if (afterAction.includes(query)) {
        store._feedback = response.data.data.feedback;
        store.selectedMessage = null;

        update();
      }

      /** */
    });
  } catch (e) {}
}

export async function fetchMessage<Q extends keyof SCMessageQueries>(
  query: Q,
  params?: SCMessageParams<Q>,
  action?: (response: any) => void
) {
  try {
    const store = useFeedbackStore();

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
  } catch (e) {}
}

export async function fetchFeedbackAnswer<Q extends keyof FBAnswerQueries>(
  query: Q,
  data?: FBAnswerParams<Q>,
  action?: (response: any) => void
) {
  try {
    const store = useFeedbackStore();

    return await instance({
      url: 'v1/bot/messagenew/feedback/answer/' + query,
      data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        store.answers = response.data.data ?? [];

        /** */
      }

      /** */
    });
  } catch (e) {}
}

export async function fetchFeedbackNotify<
  Q extends keyof FBNotificationQueries
>(query: Q, data?: FBNotificationParams<Q>, action?: (response: any) => void) {
  try {
    const store = useFeedbackStore();

    return await instance({
      url: 'v1/bot/messagenew/feedback/notification/' + query,
      data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        store.notifications = response.data.data;

        /** */
      }

      /** */
    });
  } catch (e) {}
}
