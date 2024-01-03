import { defineStore } from 'pinia';
import { WorkStore } from './workModels';

export const useWorkStore = defineStore('work', {
  state: () =>
    ({
      chat: false,

      categories: categories,

      section: 'select',

      view: 'table',

      drawer: {
        state: true,
        mini: false,
      },
      dialogs: {
        edit_ticket: false,
        executor_transfer: false,
        transfer_ticket: false,
      },

      selectedTicket: null,
      selectedCategory: null,
    } as WorkStore),
  getters: {},
  actions: {},
});

const categories = [
  {
    id: 123123,
    label: 'Основные тикеты',
    status: 0,
    tickets: [
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
      {
        id: 23,
        status: 1,
        name: 'Charity',
        executor: 'Tyrone',
        request_from: 'Raphael',
        create_at: 1724117789,
      },
      {
        id: 24,
        status: 2,
        name: 'Ebony',
        executor: 'Mara',
        request_from: 'Shaine',
        create_at: 1689583114,
      },
    ],
  },
  {
    id: 43564532,
    label: 'Главный менеджер',
    status: 1,
    tickets: [
      // {
      //   id: 1,
      //   status: 0,
      //   name: 'Blake',
      //   executor: 'Edan',
      //   request_from: 'Denise',
      //   create_at: 1700940604,
      // },
      // {
      //   id: 2,
      //   status: 1,
      //   name: 'Francesca',
      //   executor: 'Hope',
      //   request_from: 'Galvin',
      //   create_at: 1685630068,
      // },
      // {
      //   id: 3,
      //   status: 1,
      //   name: 'Harding',
      //   executor: 'Russell',
      //   request_from: 'Wang',
      //   create_at: 1689237196,
      // },
      // {
      //   id: 4,
      //   status: 2,
      //   name: 'Alvin',
      //   executor: 'Keely',
      //   request_from: 'Eugenia',
      //   create_at: 1712631473,
      // },
    ],
  },
  {
    id: 4356,
    label: 'Разработка и ошибки',
    status: 0,
    tickets: [
      {
        id: 8,
        status: 0,
        name: 'Claire',
        executor: 'Marshall',
        request_from: 'Isaac',
        create_at: 1668389346,
      },
      {
        id: 9,
        status: 0,
        name: 'Alfreda',
        executor: 'Gemma',
        request_from: 'Barry',
        create_at: 1688763946,
      },
      {
        id: 10,
        status: 1,
        name: 'Isaac',
        executor: 'Benedict',
        request_from: 'Kenneth',
        create_at: 1707289349,
      },
      {
        id: 11,
        status: 1,
        name: 'Hoyt',
        executor: 'Fletcher',
        request_from: 'Malik',
        create_at: 1702794620,
      },
    ],
  },
  {
    id: 39904,
    label: 'Web модули',
    status: 1,
    tickets: [
      {
        id: 13,
        status: 2,
        name: 'Cherokee',
        executor: 'Kermit',
        request_from: 'Colt',
        create_at: 1681901829,
      },
      {
        id: 14,
        status: 1,
        name: 'Cynthia',
        executor: 'Lacy',
        request_from: 'Galena',
        create_at: 1704065893,
      },
      {
        id: 15,
        status: 1,
        name: 'Heidi',
        executor: 'Jolie',
        request_from: 'Isaiah',
        create_at: 1663625793,
      },
      {
        id: 16,
        status: 1,
        name: 'Cally',
        executor: 'Elliott',
        request_from: 'Sheila',
        create_at: 1720777483,
      },
    ],
  },
];
