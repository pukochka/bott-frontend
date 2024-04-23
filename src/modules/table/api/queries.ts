import { instance } from '../../support/api/instance';

type BottTableData = Record<string, string | boolean | number>;

export async function fetchTable(
  query: string,
  data?: Record<string, string | boolean | number>,
  handle?: (response: any) => void
) {
  try {
    return await instance({
      url: query,
    }).then((response) => {
      if (handle !== void 0) handle(response.data.data);
    });
  } catch (e) {}
}
