import {
  mdiNetworkPos,
  mdiAccount,
  mdiRobotOutline,
  mdiHandshake,
  mdiDeveloperBoard,
  mdiStore,
} from '@quasar/extras/mdi-v7';

import { t } from 'src/boot/lang';

const layoutButtons: LayoutButtons[] = [
  {
    label: t('desktop'),
    link: '/desktop',
    icon: mdiNetworkPos,
  },
  {
    label: t('profile'),
    link: '/profile',
    icon: mdiAccount,
  },
  {
    label: t('bots'),
    link: '/my-bots',
    icon: mdiRobotOutline,
  },
  {
    label: t('partners'),
    link: '/partners',
    icon: mdiHandshake,
  },
  {
    label: t('personal-development'),
    link: '/personal-development',
    icon: mdiDeveloperBoard,
  },
  {
    label: 'Биржа и реклама',
    link: '/stock',
    icon: mdiStore,
    is_new: true,
  },
];

const headerButtons = [
  {
    label: t('services'),
    menu: [
      {
        label: t('link-generator'),
        items: [
          {
            label: t('instructions'),
            link: '',
          },
          {
            label: t('use'),
            link: '',
          },
        ],
      },
      {
        label: t('id-chat-chanel'),
        items: [
          {
            label: t('instructions'),
            link: '',
          },
          {
            label: t('use'),
            link: '',
          },
        ],
      },
      {
        label: t('id-stiker'),
        items: [
          {
            label: t('instructions'),
            link: '',
          },
          {
            label: t('use'),
            link: '',
          },
        ],
      },
    ],
  },
  {
    label: t('help'),
    menu: [
      {
        label: t('help'),
        items: [
          {
            label: 'FAQ',
            link: '',
          },
          {
            label: 'Видео уроки',
            link: '',
          },
          {
            label: 'Поддержка',
            link: '',
          },
        ],
      },
      {
        label: 'Ресурсы',
        items: [
          {
            label: 'Канал',
            link: '',
          },
          {
            label: 'Чат',
            link: '',
          },
          {
            label: 'Instagram',
            link: '',
          },
          {
            label: 'YouTube',
            link: '',
          },
        ],
      },
    ],
  },
];

export { layoutButtons, headerButtons };

interface LayoutButtons {
  label: string;
  icon?: string;
  link?: string;
  is_new?: boolean;
}
