import CommonType from 'src/components/select-type/CommonType.vue';
import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import WebModule from 'src/components/select-type/WebModule.vue';
import InfoType from 'src/components/info/InfoType.vue';

import { t } from 'src/boot/lang';

export const inlineButtons = [
  {
    label: t('link'),
    type: 0,
  },
  {
    label: t('action'),
    type: 1,
  },
  {
    label: t('share'),
    type: 2,
  },
  {
    label: t('text'),
    type: 3,
  },
  {
    label: t('web-module'),
    type: 4,
  },
];

export const inlineTypes: Record<number, any> = {
  0: {
    label: t('enter-link'),
    hint: t('example-link'),
    component: CommonType,
    default: 'https://',
  },
  1: {
    component: ActionMenu,
  },
  2: {
    grow: true,
    label: t('share'),
    default: t('share'),
    component: CommonType,
  },
  3: {
    grow: true,
    label: t('your-text'),
    component: CommonType,
  },
  4: {
    component: WebModule,
  },
  5: {
    label:
      'Кнопка принадлежит к маршруту, который поддерживает свободные сообщения',
    component: InfoType,
  },
  6: {
    label: t('button-inactive'),
    component: InfoType,
  },
};
