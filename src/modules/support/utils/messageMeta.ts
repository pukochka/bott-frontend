import { date } from 'quasar';
import { weekDays } from './common';

const TG_LINK_RE = /href=[\"'](.*)[\"'].*/;
const OFFSET = 3 * 60 * 60 * 1000;

export interface StatusView {
  label: string;
  color: string;
  text: string;
}

export const ticketStatuses: Record<string, StatusView> = {
  0: {
    label: 'Обратитесь в поддержку',
    color: 'grey',
    text: '',
  },
  1: {
    label: 'Закрыт',
    color: 'red',
    text: 'Вы уверены, что хотите закрыть тикет?',
  },
  2: {
    label: 'Открыт',
    color: 'positive',
    text: '',
  },
  3: {
    label: 'Ожидает закрытия',
    color: 'primary',
    text: 'Вы уверены, что хотите предложить закрыть тикет?',
  },
  4: {
    label: 'Повторно открыт',
    color: 'warning',
    text: '',
  },
  5: {
    label: 'Ожидает менеджера',
    color: 'grey',
    text: '',
  },
};

export function getMessageTime(time: string | undefined | null) {
  const timestamp = Date.parse(time || '0') + OFFSET;

  return date.formatDate(timestamp, 'HH:mm');
}

export function getMessageFormattedTime(time: string | undefined | null) {
  const now = Date.now();
  const timestamp = Date.parse(time || '0') + OFFSET;

  const dayNow = date.formatDate(now, 'd');
  const weekNow = date.formatDate(now, 'w');

  const dayTime = date.formatDate(timestamp, 'd');
  const weekTime = date.formatDate(timestamp, 'w');

  return weekNow === weekTime
    ? dayNow === dayTime
      ? date.formatDate(timestamp, 'HH:mm')
      : weekDays[Number(dayTime) || 0]
    : date.formatDate(timestamp, 'DD.MM.YYYY');
}

export function getUserLink(user: BOTTUser) {
  return TG_LINK_RE.test(user.link)
    ? TG_LINK_RE.exec(user.link)?.[1] || user.link
    : user.link;
}
