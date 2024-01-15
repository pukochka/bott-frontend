import { t } from 'src/boot/lang';
import menu from 'layouts/content/menu';
import { faqContent } from 'layouts/content/faq';

export default {
  title: t('category-questions'),
  requiredParams: [],

  drawer: menu,
  withoutRight: true,

  toc: [
    {
      title: 'FAQ',
      buttons: () => faqContent['/'],
    },
  ],
};
