import { instance } from './instance';
import { useSupportStore } from '../stores/supportStore';

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

      // if (query === 'index') {
      //   /** */
      //
      //   support.tickets = response.data.data;
      //
      //   /** */
      // }

      /** */
    });
  } catch (e) {}
}
