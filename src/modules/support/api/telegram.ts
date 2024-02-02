import axios from 'axios';
import { TG_API } from '../utils/common';
import { config } from '../config';

interface GetFileResponseData {
  file_id: string;
  file_path: string;
  file_size: number;
  file_unique_id: string;
}

export async function fetchFile(
  file_id: string,
  action?: (response: GetFileResponseData) => void
) {
  try {
    return await axios
      .get(TG_API + `bot${config.bot.token}/getFile?file_id=${file_id}`)
      .then((response) => {
        /** */
        if (response.data.ok) {
          if (action !== void 0) action(response.data.result);
        }
        /** */
      })
      .catch(console.log);
  } catch (e) {}
}
