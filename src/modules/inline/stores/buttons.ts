import CommonType from 'src/components/select-type/CommonType.vue';
import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import WebModule from 'src/components/select-type/WebModule.vue';
import InfoType from 'src/components/info/InfoType.vue';

export const inlineButtons = [
  {
    label: 'Ссылка',
    type: 0,
  },
  {
    label: 'Действие',
    type: 1,
  },
  {
    label: 'Поделиться',
    type: 2,
  },
  {
    label: 'Текст',
    type: 3,
  },
  {
    label: 'WEB модуль',
    type: 4,
  },
];

export const inlineTypes: Record<number, any> = {
  0: {
    label: 'Введите ссылку',
    hint: 'Пример ссылки: https://bot-t.com',
    component: CommonType,
    default: 'https://',
  },
  1: {
    component: ActionMenu,
  },
  2: {
    grow: true,
    label: 'Поделиться',
    default: 'Поделиться',
    component: CommonType,
  },
  3: {
    grow: true,
    label: 'Ваш текст',
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
    label: 'Кнопка неактивна',
    component: InfoType,
  },
};
