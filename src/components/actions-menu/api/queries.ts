import { instance } from './instance';
import { useMenuStore } from '../stores/menuStore';
import { useDialog } from 'src/utils/use/useDialog';
import { useRoutes } from '../useMenu';

export async function fetchMenu(action: () => void) {
  try {
    return await instance({
      url: 'v1/bot/route/path',
      data: { bot_id: 886 },
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
