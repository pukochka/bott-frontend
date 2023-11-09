import { biTelegram } from '@quasar/extras/bootstrap-icons';

import { mdiEmail, mdiYoutube, mdiInstagram } from '@quasar/extras/mdi-v7';

import { t } from 'src/boot/lang';

const footer = {
  text: t('footer-desc'),
  columns: [
    {
      title: t('management'),
      items: [
        {
          label: t('agreement'),
          link: '',
        },
        {
          label: t('use-resource'),
          link: '',
        },
        {
          label: t('cookie-policy'),
          link: '',
        },
        {
          label: t('privacy-policy'),
          link: '',
        },
        {
          label: t('public-offer'),
          link: '',
        },
      ],
    },
    {
      title: t('help'),
      items: [
        {
          label: t('faq'),
          link: '',
        },
        {
          label: t('support'),
          link: '',
        },
      ],
    },
  ],
  services: [
    {
      icon: biTelegram,
      link: '',
    },
    {
      icon: mdiInstagram,
      link: '',
    },
    {
      icon: mdiYoutube,
      link: '',
    },
    {
      icon: mdiEmail,
      link: '',
    },
  ],
};

export { footer };
