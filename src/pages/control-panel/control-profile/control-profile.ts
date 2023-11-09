import menu from 'layouts/content/menu';
import { t } from 'src/boot/lang';

export default {
  title: t('page-control-profile'),
  requiredParams: ['bot_id'],

  drawer: menu,
};
