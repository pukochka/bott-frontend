import { defineStore } from 'pinia';
import { DialogNames, WorkStore } from './supportModels';
import { fetchSupportTicket } from '../api/queries';

export const useSupportStore = defineStore('support', {
  state: () =>
    ({
      chat: false,

      categories: [],
      tickets: [],
      implementers: [],
      messages: [],

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
        select_implementer: false,
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
        limit: 25,
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
    openChat(ticket: any) {
      this.selectedTicket = ticket;
      this.chat = true;
    },
    closeChat() {
      this.selectedTicket = null;
      this.chat = false;
    },

    selectCategory(category: SupportCategory) {
      this.loading.category = true;

      this.tickets = [];
      this.section = 'list';
      this.pagination.offset = 0;
      this.pagination.page = 1;
      this.pagination.count = 0;
      this.selectedCategory = category;

      this.updateCategory(category.id, true).then();
    },

    updateCategory(id: number, loading?: boolean) {
      return Promise.all([
        fetchSupportTicket(
          'index',
          {
            category_id: id,
            offset: this.pagination.offset,
            limit: this.pagination.limit,
          },
          (response) => {
            this.tickets = response;
          }
        ),
        fetchSupportTicket('count', { category_id: id }, (response) => {
          const count = Number(response);

          this.pagination.count = !isNaN(count) ? count : 0;
        }),
      ]).then(() => {
        if (loading) this.loading.category = false;
      });
    },
  },
});
