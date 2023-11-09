import { t } from 'src/boot/lang';
import menu from 'layouts/content/menu';

export default {
  title: t('edit-free-message'),
  requiredParams: ['bot_id', 'id'],

  withoutFooter: true,
  drawer: menu,
};
