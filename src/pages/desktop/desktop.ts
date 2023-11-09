import { faqContent } from 'layouts/content/faq';
import { t } from 'src/boot/lang';

export default {
  title: t('desktop'),
  requiredParams: [],

  toc: [
    {
      title: 'FAQ',
      buttons: () => faqContent['/'],
    },
  ],
};
