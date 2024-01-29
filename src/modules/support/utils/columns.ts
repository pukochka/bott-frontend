import { date } from 'quasar';

import TicketInfo from '../components/items/sections/TicketInfo.vue';
import TicketStatus from '../components/items/sections/StatusView.vue';
import UserView from '../components/items/sections/UserView.vue';
import TicketMessageView from '../components/items/sections/MessageView.vue';

export const columns: Array<any> = [
  {
    autoWidth: true,
    name: 'id',
    label: 'Название',
    field: (row: SupportTicket) => row.title,
    hover: false,
    component: TicketInfo,
  },
  {
    autoWidth: true,
    name: 'message',
    label: 'Сообщение',
    field: (row: SupportTicket) => row.last_message?.message?.text ?? '',
    hover: false,
    component: TicketMessageView,
  },
  {
    name: 'status',
    label: 'Статус',
    field: (row: SupportTicket) => row,
    hover: false,
    component: TicketStatus,
  },
  {
    name: 'implementer',
    label: 'Исполнитель',
    field: (row: SupportTicket) =>
      row.manager !== null
        ? row.manager?.first_name + ' ' + row.manager?.last_name
        : null,
    hover: false,
    component: UserView,
  },
  {
    name: 'name',
    label: 'Запрос от',
    field: (row: SupportTicket) =>
      row.user?.first_name + ' ' + row.user?.last_name,
    hover: false,
    component: UserView,
  },
  {
    name: 'time',
    label: 'Время создания',
    field: (row: SupportTicket) =>
      date.formatDate(Date.parse(row.created_at), 'DD MMM, YYYY HH:mm'),
    hover: false,
    component: TicketInfo,
  },
];
