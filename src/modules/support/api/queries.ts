import { instance } from './instance';
import { useSupportStore } from '../stores/supportStore';

const ticketQueries = ['change-manager', 'get-ticket', 'change-status'];

export async function fetchSupportCategory<
  Q extends keyof SupportCategoryQueries
>(query: Q, data?: SupportCategoryParams<Q>, action?: (response: any) => void) {
  try {
    const support = useSupportStore();

    return await instance({
      url: 'v1/support/category/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        support.categories = response.data.data;

        /** */
      }

      /** */
    });
  } catch (e) {}
}

export async function fetchSupportTicket<Q extends keyof SupportTicketQueries>(
  query: Q,
  data?: SupportTicketParams<Q>,
  action?: (response: any) => void
) {
  try {
    const support = useSupportStore();

    return await instance({
      url: 'v1/support/ticket/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        support.tickets = response.data.data;

        /** */
      } else if (ticketQueries.includes(query)) {
        /** */

        support.selectedTicket = response.data.data;

        /** */
      } else if (query === 'search-title') {
        /** */

        support.search.foundingTicketsByTitle = response.data.results.filter(
          (item: { id: string }) => item.id !== ''
        );

        /** */
      }

      /** */
    });
  } catch (e) {}
}

export async function fetchSupportMessages<
  Q extends keyof SupportTicketQueries
>(query: Q, data?: SupportTicketParams<Q>, action?: (response: any) => void) {
  try {
    const support = useSupportStore();

    return await instance({
      url: 'v1/support/ticket-message/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'get-messages') {
        /** */

        const storeLength = support.messages.length;
        const responseLength = response.data?.data?.length;

        if (
          support.messages[storeLength - 1]?.id ===
          response.data?.data?.[responseLength - 1]?.id
        )
          return;

        support.messages = response.data.data;

        /** */
      }

      /** */
    });
  } catch (e) {}
}

export async function fetchSupportImplementer<
  Q extends keyof SupportImplementerQueries
>(
  query: Q,
  data?: SupportImplementerParams<Q>,
  action?: (response: any) => void
) {
  try {
    const support = useSupportStore();

    return await instance({
      url: 'v1/support/implementer/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        support.implementers = response.data.data;

        /** */
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
    return await instance({
      url: 'v1/bot/messagenew/message/' + query,
      data: params,
    }).then((response) => {
      if (action) action(response.data.data);
    });
  } catch (e) {}
}
