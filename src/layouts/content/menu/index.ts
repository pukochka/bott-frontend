import sections from 'src/content/control/sections';

import { commonButtons } from 'src/content/control/settings';

import { t } from 'src/boot/lang';

export default [
  {
    label: t('desktop-shop'),
    icon: 'display_settings',
    link: '/control-panel',
  },
  {
    label: t('users'),
    icon: 'group',
    link: '/users',
  },
  {
    label: t('premium-settings'),
    icon: 'workspace_premium',
    link: '',
    sub: () => [
      {
        label: t('to-pay'),
        link: '',
      },
      {
        label: t('control-menu'),
        link: '',
      },
      {
        label: t('scenarios'),
        link: '',
      },
      {
        label: t('free-messages'),
        link: '',
      },
      {
        label: t('modules'),
        link: '',
      },
    ],
  },
  {
    label: t('category-and-products'),
    icon: 'inventory_2',
    link: '/control-products',
  },
  {
    label: t('orders'),
    icon: 'bookmark_border',
    link: '/orders',
  },
  {
    label: t('shop-settings'),
    icon: 'tune',
    link: '',
    sub: (type?: string) => (type ? commonButtons[type] : []),
  },
  {
    label: t('control-sections'),
    icon: 'settings',
    link: '',
    sub: () => sections,
  },
  {
    label: t('mailing'),
    icon: 'outgoing_mail',
    link: '',
    sub: () => [
      {
        label: 'Создать новую',
        link: '',
      },
      {
        label: 'История',
        link: '',
      },
    ],
  },
  {
    label: t('statistics'),
    icon: 'query_stats',
    link: '',
    sub: () => [
      {
        label: 'История',
        link: '',
      },
    ],
  },
] as BOTTDrawerButtons[];
