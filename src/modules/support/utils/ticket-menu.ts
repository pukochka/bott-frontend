import {
  mdiBriefcase,
  mdiBriefcaseArrowUpDown,
  mdiTagCheck,
  mdiTagRemove,
  mdiTransfer,
  mdiCog,
  mdiTagOff,
} from '@quasar/extras/mdi-v7';

export interface TicketMenuView {
  label: string;
  icon: string;
  color: string;
}

export type TicketMenuNames =
  | 'pick'
  | 'transfer'
  | 'move'
  | 'offer'
  | 'edit'
  | 'close'
  | 'delete';

export const ticketMenu: Record<TicketMenuNames, TicketMenuView> = {
  pick: {
    label: 'Взять в работу тикет',
    icon: mdiBriefcase,
    color: 'accent',
  },
  close: {
    label: 'Закрыть тикет',
    icon: mdiTagCheck,
    color: 'positive',
  },
  transfer: {
    label: 'Передать другому исполнителю',
    icon: mdiBriefcaseArrowUpDown,
    color: 'info',
  },
  move: {
    label: 'Переместить тикет в другую категорию',
    icon: mdiTransfer,
    color: 'secondary',
  },
  offer: {
    label: 'Предложить закрыть тикет',
    icon: mdiTagOff,
    color: 'warning',
  },
  edit: {
    label: 'Редактровать настройки тикета',
    icon: mdiCog,
    color: 'primary',
  },
  delete: {
    label: 'Удалить тикет',
    icon: mdiTagRemove,
    color: 'negative',
  },
};

/**
 * 1 - move pick edit delete
 * 2 - transfer move offer edit delete
 * 3 - move transfer pick close edit delete
 * 4 - transfer move pick edit delete
 * 5 - move pick edit delete
 * */
