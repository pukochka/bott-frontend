import { instance } from './instance';
import { useMenuStore } from '../stores/menuStore';
import { useRoutes } from '../useMenu';
import { useDialog } from '../../../modules/file-manager/stores/useDialog';

export async function fetchMenu(
  query: string,
  bot_id: number,
  token: string,
  message_id: number,
  host: string,
  action: () => void
) {
  try {
    return await instance({
      url: host + 'v1/bot/routenew/path/' + query,
      data: { bot_id: bot_id ?? 0, message_id: message_id },
      params: { token: token },
    }).then((response) => {
      const menu = useMenuStore();

      menu.routes = response.data.data ?? [];

      menu.search = useRoutes(menu.routes);

      action();
    });
  } catch (e) {
    useDialog('Попробуйте перезагрузить старницу - это должно помочь.');
  }
}
