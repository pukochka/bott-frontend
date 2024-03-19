import { config } from '../config';
import instance from './interseptor';

import { useInlineStore } from '../stores/inlineStore';
import { useDialog } from 'src/utils/use/useDialog';
import { useNotify } from 'src/utils/use/useNotify';

const scenariosQueries = ['update-data-and-type'];

export async function fetchMenu<Q extends keyof IMQueries>(
  query: Q,
  params?: IMParams<Q>
) {
  const inline = useInlineStore();

  try {
    return await instance({
      url: inline.host + 'v1/bot/keyboard/inline-new/' + query,
      data: params,
    }).then((response) => {
      /** */

      if (inline.scenarios && scenariosQueries.includes(query)) {
        const scenario = <SCCommandView>response.data.data;
        const message = scenario.columns
          .map((item) =>
            item.messages.find((message) => message.id === inline.message.id)
          )
          .filter(Boolean);

        inline.message.menu = message[0]?.menu
          ? message[0]?.menu
          : inline.message.menu;
      } else {
        inline.message.menu = response.data.data;
      }

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
  const inline = useInlineStore();

  try {
    return await instance({
      url: inline.host + 'v1/bot/messagenew/message/' + query,
      data: params,
    }).then((response) => {
      if (action) action(response.data.data);

      if (query === 'add-inline-menu') {
        /** */

        inline.message.menu = response.data.data?.menu;

        /** */
      } else if (query === 'delete-inline-menu') {
        /** */

        inline.message.menu = null;

        /** */
      } else if (query === 'types') {
        /** */

        inline.types = response.data.data;

        /** */
      } else if (query === 'get') {
        /** */

        inline.message = response.data.data;

        /** */
      } else if (query === 'test') {
        /** */

        useNotify('Сообщение успешно отправлено!');

        /** */
      } else if (query === 'update-title') {
        /** */

        inline.message.title = response.data.data;

        /** */
      } else if (query === 'set-next-message') {
        /** */

        inline.message.nextMessage = response.data.data?.nextMessage ?? null;

        /** */
      } else if (query === 'drop-next-message') {
        /** */

        inline.message.nextMessage = null;

        /** */
      }
    });
  } catch (e) {
    useDialog('Что-то пошло не так, обратитесь в поддержку.');
  }
}

export async function fetchSettings(
  query: 'settings' | 'update-settings',
  id: number,
  params?: Record<string, any>
) {
  const inline = useInlineStore();

  const data = Object.assign(params ?? {}, { id });

  try {
    return await instance({
      url: inline.host + 'v1/bot/message/settings/' + query,
      data: data,
    }).then((response) => {
      /** */

      inline.settings = response.data.data ?? [];

      /** */
    });
  } catch (e) {
    useDialog('Что-то пошло не так, обратитесь в поддержку.');
  }
}

const limit = 6;

export async function fetchUpdateMessages(offset: number) {
  const inline = useInlineStore();

  try {
    return await Promise.all([
      instance({
        url: inline.host + '/v1/bot/messagenew/message/index',
        data: { user_id: config.user_id, offset, limit },
      }).then(
        (response) => (inline.combine.messages = response.data.data || [])
      ),
      instance({
        url: inline.host + '/v1/bot/messagenew/message/count',
        data: { user_id: config.user_id, offset, limit },
      }).then(
        (response) => (inline.combine.count = Number(response.data.data) || 0)
      ),
    ]);
  } catch (e) {
    useDialog('Что-то пошло не так, обратитесь в поддержку.');
  }
}
