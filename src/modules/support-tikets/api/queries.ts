import { instance } from './instance';
import { useWorkStore } from '../stores/workStore';

export async function fetchSupportCategory<
  Q extends keyof SupportCategoryQueries
>(query: Q, data?: SupportCategoryParams<Q>, action?: (response: any) => void) {
  try {
    const work = useWorkStore();

    return await instance({
      url: 'v1/support/category/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        work.categories = response.data.data;

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
    const work = useWorkStore();

    return await instance({
      url: 'v1/support/ticket/' + query,
      data: data,
    }).then((response) => {
      /** */

      if (action !== void 0) action(response.data.data);

      if (query === 'index') {
        /** */

        work.tickets = response.data.data;

        /** */
      }

      /** */
    });
  } catch (e) {}
}
