import {
  mdiAccountArrowLeft,
  mdiBell,
  mdiCog,
  mdiHumanGreeting,
  mdiMessageAlert,
  mdiMessageArrowRight,
  mdiAccountAlert,
  mdiForum,
  mdiAccountNetwork,
  mdiClockEditOutline,
} from '@quasar/extras/mdi-v7';
import { usePSStore } from '../../stores/PSstore';
const store = usePSStore();
export const additional: Record<AdditionalKeys, AdditionalContent> = {
  hello: {
    icon: mdiHumanGreeting,
    action: '',
    text: 'Приветсвие при отправке',
    position: 1,
  },
  cancel: {
    icon: mdiMessageAlert,
    action: '',
    text: 'Сообщение при клике на отмену',
    position: 2,
  },
  end: {
    icon: mdiMessageArrowRight,
    action: '',
    text: 'Прощание после ответа на все вопросы',
    position: 3,
  },
  notice: {
    icon: mdiBell,
    action: '',
    text: 'Уведолмение для пользователя',
    position: 4,
  },
  noticeAdmin: {
    icon: mdiAccountAlert,
    action: '',
    text: 'Уведолмение для администраторов',
    position: -1,
  },
  startAdmin: {
    icon: mdiAccountArrowLeft,
    action: '',
    text: 'Уведолмение для админа, которое отправляется,\n когда пользователь начал отвечать на вопросы',
    position: -2,
  },
  answerAdmin: {
    icon: mdiForum,
    action: '',
    text: 'Админинстративное уведомление',
    position: -3,
  },
  admin: {
    icon: mdiAccountNetwork,
    action: '',
    text: 'Уведолмение для админа, которое отправляется,\n когда пользователь закончил отвечать на вопросы',
    position: -4,
  },
  setting: {
    icon: mdiClockEditOutline,
    action: () => {
      store.dialogs.setting = true;
    },
    text: 'Настройки уведомлений',
    position: 9,
  },
};

export const keysOfAdd = <Array<AdditionalKeys>>Object.keys(additional);

export type AdditionalKeys =
  | 'setting'
  | 'admin'
  | 'answerAdmin'
  | 'startAdmin'
  | 'noticeAdmin'
  | 'notice'
  | 'end'
  | 'cancel'
  | 'hello';

export interface AdditionalContent {
  icon: string;
  action: any;
  text: string;
  position: number;
}
