import instance from './instance';
import { useFMStore } from '../stores/FMStrore';
import { debounce } from 'quasar';
import { config } from '../config';

export async function fetchFile<Q extends keyof FMQueries>(
  query: Q,
  params?: FMParams<Q>,
  action?: () => void
) {
  const data = useFMStore();

  const host = config.value.host + 'v1/bot/manager/' + +config.value.query;

  const url =
    (query.includes('/')
      ? host.slice(0, host.lastIndexOf('/') + 1)
      : 'v1/bot/manager/' + config.value.query + '/') + query;

  try {
    return await instance({
      url: url,
      data: params,
    }).then((response) => {
      /** */

      if (action !== void 0) action();

      if (query === 'index') {
        /** */

        data.usersFiles = response.data?.data?.files ?? [];
        data._employed = response.data?.data?.employed ?? 0;
        data.allow_size = response.data?.data?.allow_size;
        data.file_max_size = response.data?.data?.file_max_size ?? 10485760;
        data.file_support_extensions =
          response.data?.data?.file_support_extensions ?? [];
        data.paths = response.data?.data?.paths ?? 'photos';

        data.usersFiles = data.usersFiles.sort((a, b) => a.date - b.date);

        /** */
      } else if (query === 'main/delete') {
        /** */

        data._employed = Number(response.data?.data) ?? 0;

        /** */
      }

      /** */
    });
  } catch (e) {}
}

export const updateFiles = debounce(
  () =>
    fetchFile('index', undefined, () => {
      const data = useFMStore();
      data.uploadMenu = false;
    }),
  700
);
