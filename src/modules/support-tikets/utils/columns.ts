import TicketInfo from '../components/items/sections/TicketInfo.vue';
import TicketStatusGrid from '../components/items/sections/TicketStatusGrid.vue';
import UserView from '../components/items/sections/GridUserView.vue';

export const columns: Array<any> = [
  {
    autoWidth: true,
    name: 'id',
    align: 'left',
    label: 'Название',
    field: (row: any) => 'Тикет №' + row.id,
    hover: false,
    component: TicketInfo,
  },
  {
    autoWidth: true,
    name: 'message',
    align: 'center',
    label: 'Сообщение',
    classes: 'ellipsis-3-lines text-wrap',
    style: 'min-width: 200px',
    field: () =>
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus distinctio eum omnis quibusdam. Amet aspernatur blanditiis deserunt distinctio dolorem dolorum eos maiores minus necessitatibus, optio placeat provident recusandae reiciendis sint?',
    hover: false,
    component: TicketInfo,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: (row: any) => row.status,
    hover: false,
    component: TicketStatusGrid,
  },
  {
    name: 'executor',
    align: 'center',
    label: 'Исполнитель',
    field: (row: any) => row?.manager?.link,
    hover: false,
    component: UserView,
  },
  {
    name: 'name',
    align: 'center',
    label: 'Запрос от',
    field: (row: any) => row?.user?.link,
    hover: false,
    component: UserView,
  },
  {
    name: 'time',
    align: 'center',
    label: 'Время создания',
    field: (row: any) => row.create_at,
    hover: false,
    component: TicketInfo,
  },
];
