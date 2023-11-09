import CommonType from 'src/components/select-type/CommonType.vue';
import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import WebModule from 'src/components/select-type/WebModule.vue';
import InfoType from 'src/components/info/InfoType.vue';

export const replyButtons = [
  {
    label: 'Действие',
    type: 0,
  },
  {
    label: 'WEB модуль',
    type: 1,
  },
  {
    label: 'Поделиться контактом',
    type: 2,
  },
  {
    label: 'Поделиться локацией',
    type: 3,
  },
  {
    label: 'Сценарий',
    type: 5,
  },
];

export const replyTypes: Record<number, any> = {
  0: {
    component: ActionMenu,
  },
  1: {
    component: WebModule,
  },
  2: {
    grow: true,
    label: 'Поделиться контактом',
    default: 'Ваш текст',
    component: CommonType,
  },
  3: {
    grow: true,
    label: 'Поделиться локацией',
    default: 'Ваш текст',
    component: CommonType,
  },
  5: {
    label:
      'Кнопка принадлежит к маршруту, который поддерживает свободные сообщения',
    component: InfoType,
  },
  6: {
    label: 'Неактивная кнопка',
    component: InfoType,
  },
};
