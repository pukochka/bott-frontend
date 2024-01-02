import CommonType from 'src/components/select-type/CommonType.vue';
import ActionMenu from 'src/components/actions-menu/ActionMenu.vue';
import WebModule from 'src/components/select-type/WebModule.vue';
import InfoType from 'src/components/info/InfoType.vue';
import { config } from '../config';

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
    index: true,
    static: true,
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
      'Кнопка при нажатии на которую будет выполняться сценарий. Сценарий будет называться так же как и кнопка',
    component: InfoType,
    buttons: [
      {
        label: 'Раздел сценариев',
        link: `/lk/common/premium/route?bot_id=${config.bot.id}`,
        type: 'scenario', // TODO Костыль
      },
    ],
  },
  6: {
    label: 'Неактивная кнопка',
    component: InfoType,
  },
};
