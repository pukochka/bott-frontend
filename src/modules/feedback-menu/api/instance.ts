import axios from 'axios';
import { config } from '../config';
import { useDialog } from '../../file-manager/stores/useDialog';
import { useFeedbackStore } from '../stores/feedbackStore';

export const instance = axios.create({
  baseURL: config.host,
  method: 'post',
});

instance.interceptors.request.use(function (request) {
  const store = useFeedbackStore();

  request.params = { token: config.bot.token };
  request.data = {
    bot_id: config.bot.id,
    message_id: store.message.id,
    feedback_id: store.feedback.id,
    ...request.data,
  };

  return request;
});

instance.interceptors.response.use(
  function (response) {
    const url = response.config.url ?? '';
    const cut = url.lastIndexOf('/');

    if (!response.data.result) {
      useDialog(
        response.data?.message ?? 'Что-то пошло не так, обратитесь в поддержку.'
      );

      if (
        ['set-crossroad-option-next', 'set-input-next'].includes(
          url.slice(cut + 1)
        )
      ) {
        return response;
      }

      return Promise.reject('error');
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
