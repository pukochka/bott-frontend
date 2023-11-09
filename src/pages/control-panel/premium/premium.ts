import menu from 'layouts/content/menu';
import { t } from 'src/boot/lang';

export default {
  title: t('premium-settings'),
  requiredParams: ['bot_id'],

  drawer: menu,
};
