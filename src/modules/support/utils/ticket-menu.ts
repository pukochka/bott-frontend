import {
  mdiBriefcase,
  mdiBriefcaseArrowUpDown,
  mdiTagCheck,
  mdiTagRemove,
  mdiTransfer,
  mdiCog,
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
  | 'delete';

export const ticketMenu: Record<TicketMenuNames, TicketMenuView> = {
  pick: {
    label: 'Взять в работу тикет',
    icon: mdiBriefcase,
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
    icon: mdiTagCheck,
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
