import { defaultMessageFree } from '../inline/stores/inlineModels';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
defaultMessageFree.photos = { id: 360405 };

export const config = {
  host: 'https://api.bot-t.com/',
  bot: {
    id: 886,
    user_id: 2371733,
    name: 'shop1_bot_t_ru_bot',
    token: '1172473489:AAFoRo3JvyXS5c1l5aW5qvOtDzZEQVJvf0w',
    type: 2,
    status: 1,
    paid_date: '2023-12-04',
    title: 'Пример магазина №1 BoT-T.ru',
    model_id: 901,
    notice_new_user: 0,
    notice_new_deal: 1,
    created_at: '2020-09-28',
    hello_id: 49,
    tariff_id: 4,
    language_id: 1,
    default_menu_id: 26698,
    error_id: 230331,
    currency_id: 1,
    payment_id: 4977,
    profile_id: 307363,
    time_zone: 1,
    recurrent_check_id: null,
    is_free: null,
  },
  query: 'photos',
  message: defaultMessageFree,
  dialog: false,
};
