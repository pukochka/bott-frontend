import {
  mdiViewDashboardEdit,
  mdiOctagramOutline,
  mdiStorefrontEditOutline,
  mdiClipboardEditOutline,
} from '@quasar/extras/mdi-v7';

const shopLookButtons: BOTTViewButtons[] = [
  {
    label: 'Внешний вид корзины',
    link: '',
    icon: mdiStorefrontEditOutline,
  },
  {
    label: 'Настройка дизайна заказов',
    link: '',
    icon: mdiClipboardEditOutline,
  },
  {
    label: 'Реферальная система',
    link: '',
    icon: mdiOctagramOutline,
  },
];

const digitalLookButtons: BOTTViewButtons[] = [
  {
    label: 'Простмотр "Наличия товаров"',
    link: '',
    icon: mdiViewDashboardEdit,
  },
];

const lookButtons: Record<string, BOTTViewButtons[]> = {
  /**
   * Бот приема за
   * */
  9: [],
  /**
   * Тип бота 2
   * */
  2: digitalLookButtons,
  /**
   * Тип бота 3
   * */
  10: [],
  /**
   * Тип бота 4
   * */
  7: shopLookButtons,
  /**
   * Тип бота 5
   * */
  5: [],
  /**
   * Тип бота 6
   * */
  11: [],
};

export { shopLookButtons, digitalLookButtons, lookButtons };
