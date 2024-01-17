import { defineStore } from 'pinia';
import { DialogNames, WorkStore } from './workModels';

export const useWorkStore = defineStore('work', {
  state: () =>
    ({
      chat: false,

      categories: [],
      tickets: [],

      section: 'select',

      view: 'table',

      drawer: {
        state: true,
        mini: false,
      },
      dialogs: {
        edit_ticket: false,
        select_category: false,
        executor_transfer: false,
        transfer_ticket: false,
      },

      selected: [],
      selectedTicket: null,
      selectedCategory: null,

      loading: {
        start: true,
        category: false,
      },

      pagination: {
        page: 1,
        count: 1,
        offset: 0,
      },
    } as WorkStore),
  getters: {},
  actions: {
    openDialog(name: DialogNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogNames) {
      this.dialogs[name] = false;
    },
  },
});
