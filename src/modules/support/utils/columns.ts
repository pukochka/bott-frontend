import TicketInfo from '../components/items/sections/TicketInfo.vue';
import TicketStatusGrid from '../components/items/sections/TicketStatusGrid.vue';
import UserView from '../components/items/sections/GridUserView.vue';
import { date } from 'quasar';

export const columns: Array<any> = [
  {
    autoWidth: true,
    name: 'id',
    align: 'center',
    label: 'Название',
    field: (row: SupportTicket) => row.title,
    hover: false,
    component: TicketInfo,
  },
  {
    autoWidth: true,
    name: 'message',
    align: 'center',
    label: 'Сообщение',
    classes: 'ellipsis-2-lines text-wrap',
    style: 'min-width: 150px',
    field: (row: SupportTicket) => row.last_message?.message?.text ?? '',
    hover: false,
    component: TicketInfo,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: (row: SupportTicket) => row,
    hover: false,
    component: TicketStatusGrid,
  },
  {
    name: 'executor',
    align: 'center',
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
    align: 'center',
    label: 'Запрос от',
    field: (row: SupportTicket) =>
      row.user?.first_name + ' ' + row.user?.last_name,
    hover: false,
    component: UserView,
  },
  {
    name: 'time',
    align: 'center',
    label: 'Время создания',
    field: (row: SupportTicket) =>
      date.formatDate(Date.parse(row.created_at), 'DD MMM, YYYY HH:mm'),
    hover: false,
    component: TicketInfo,
  },
];
