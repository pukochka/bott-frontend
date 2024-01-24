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
    field: (row: any) => row.title,
    hover: false,
    component: TicketInfo,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: (row: any) => row,
    hover: false,
    component: TicketStatusGrid,
  },
  {
    name: 'executor',
    align: 'center',
    label: 'Исполнитель',
    field: (row: any) =>
      row.manager !== null
        ? row.manager?.first_name + ' ' + row.manager?.last_name
        : '<span class="text-red">Нет</span>',
    hover: false,
    component: UserView,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Запрос от',
    field: (row: any) => row.user?.first_name + ' ' + row.user?.last_name,
    hover: false,
    component: UserView,
  },
  {
    name: 'time',
    align: 'center',
    label: 'Время создания',
    field: (row: any) =>
      date.formatDate(Date.parse(row.created_at), 'DD MMM, YYYY HH:mm'),
    hover: false,
    component: TicketInfo,
  },
];
