import { t } from 'src/boot/lang';
import menu from 'layouts/content/menu';

export default {
  title: t('messages-all'),
  requiredParams: [],

  withoutFooter: true,
  drawer: menu,
};
