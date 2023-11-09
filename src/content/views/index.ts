import { t } from 'src/boot/lang';

export const botTypes: BOTTBotType = {
  2: {
    label: t('bot-digital'),
    color: 'negative',
  },
  9: {
    label: t('bot-subscriptions'),
    color: 'warning',
  },
  7: {
    label: t('bot-shop'),
    color: 'primary',
  },
  10: {
    label: t('bot-free'),
    color: 'success',
  },
  11: {
    label: t('bot-review'),
    color: 'prism',
  },
  5: {
    label: t('bot-support'),
    color: 'neutral',
  },
};

export const currency: BOTTCurrency = {
  1: { short: 'RUB', label: t('currency-rub') },
  2: { short: 'USD', label: t('currency-usd') },
  3: { short: 'EUR', label: t('currency-eur') },
  4: { short: 'UAH', label: t('currency-uah') },
  5: { short: 'KZT', label: t('currency-kzt') },
  6: { short: 'BYN', label: t('currency-byn') },
  7: { short: 'UZS', label: t('currency-uzs') },
  8: { short: 'GBR', label: t('currency-gbr') },
  9: { short: 'THB', label: t('currency-thb') },
  10: { short: 'MDL', label: t('currency-mdl') },
};

export const language: BOTTLanguage = {
  1: {
    title: 'Русский',
  },
  2: {
    title: 'English',
  },
};

type BOTTTariffs = Record<number | string, { label: string; color: string }>;
export const tariffs: BOTTTariffs = {
  1: {
    label: t('tariff-free'),
    color: 'neutral',
  },
  2: {
    label: t('tariff-full'),
    color: 'warning',
  },
  3: {
    label: t('tariff-expanded'),
    color: 'success',
  },
  4: {
    label: t('tariff-professional'),
    color: 'negative',
  },
};

export const timezone: BOTTTimezone = {
  1: { label: 'Europe/Moscow' },
  2: { label: 'Europe/Kiev' },
  3: { label: 'Europe/Kaliningrad' },
  4: { label: 'Europe/Samara' },
  5: { label: 'Asia/Yekaterinburg' },
  6: { label: 'Asia/Omsk' },
  7: { label: 'Asia/Krasnoyarsk' },
  8: { label: 'Asia/Irkutsk' },
};

export const userStatuses: BOTTUserStatuses = {
  0: {
    title: t('status-manager'),
    color: 'prism',
  },
  1: {
    title: t('status-creator'),
    color: 'primary',
  },
};
