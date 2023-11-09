import menu from 'layouts/content/menu';
import { t } from 'src/boot/lang';

export default {
  title: t('control-panel'),
  requiredParams: ['bot_id'],

  drawer: menu,
};
