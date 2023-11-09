import config from '../config';

const actions = [
  {
    label: 'Настройки',
    href: `/lk/common/messages/feedback/update?bot_id=${config.bot.id}&id=${config.message_id}`,
    icon: 'settings',
  },
  {
    label: 'Настройки уведомлений',
    href: `/lk/common/messages/feedback/update-notice?bot_id=${config.bot.id}&id=${config.message_id}`,
    icon: 'notifications_active',
  },
  {
    label: 'Защита от спама',
    href: `/lk/common/messages/feedback/update-spam?bot_id=${config.bot.id}&id=${config.message_id}`,
    icon: 'sms_failed',
  },
  {
    label: `Смотреть ответы`,
    href: `/lk/common/messages/feedback/answers?bot_id=${config.bot.id}&id=${config.message_id}`,
    icon: 'mark_email_read',
  },
];

export default actions;
