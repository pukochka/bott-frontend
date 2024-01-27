import { config } from '../config';

import { defineStore } from 'pinia';
import { DialogNames, WorkStore } from './supportModels';
import {
  fetchSupportCategory,
  fetchSupportMessages,
  fetchSupportTicket,
} from '../api/queries';

import { useDialog } from '../../file-manager/stores/useDialog';
import { deleteQueryParam, setQueryParam } from 'src/utils/helpers/string';

import { ticketStatuses } from '../utils/statuses';

let interval: string | number | NodeJS.Timeout | undefined;

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
      main: 'view',

      drawer: {
        state: true,
        mini: true,
      },
      dialogs: {
        edit_ticket: false,
        select_category: false,
        implementor_transfer: false,
        transfer_ticket: false,
        select_implementer: false,
      },

      selected: [],
      selectedTicket: null,
      selectedCategory: null,

      loading: {
        start: true,
        category: false,
        chat: false,
      },

      topRef: null,
      scrollRef: null,
      chatBottomRef: null,

      pagination: {
        page: 1,
        count: 1,
        offset: 0,
        limit: 25,
      },
    } as WorkStore),
  getters: {
    offsetTop: (state): number => state.topRef?.offsetTop ?? 500,
    isMobile: () =>
      /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
        navigator.userAgent.toLowerCase()
      ),
  },
  actions: {
    openDialog(name: DialogNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogNames) {
      this.dialogs[name] = false;
    },
    openChat(ticket: SupportTicket) {
      this.selectedTicket = ticket;
      this.main = 'chat';

      clearInterval(interval);

      setQueryParam('id', ticket.id);

      this.loading.chat = true;
      this.updateMessages().then(() => {
        this.loading.chat = false;
        setTimeout(this.scrollToBottom.bind(this), 10);
      });

      interval = setInterval(
        this.updateMessages.bind(this),
        config.messages_update_time
      );
    },
    closeChat() {
      this.selectedTicket = null;
      this.main = 'view';

      clearInterval(interval);

      deleteQueryParam('id');

      if (this.categories.length && this.selectedCategory) {
        interval = setInterval(
          this.updateCategory.bind(this, this.selectedCategory?.id ?? -1),
          config.category_update_time
        );

        return;
      }

      this.loading.category = true;

      fetchSupportCategory('index', undefined).then(
        () => (this.loading.category = false)
      );
    },

    closeSection() {
      if (['log', 'manager', 'edit'].includes(this.section)) {
        this.section = 'list';
        return;
      }

      if (this.selectedCategory?.id) this.selectedCategory = null;

      clearInterval(interval);
      deleteQueryParam('category_id');

      this.section = 'select';
    },

    scrollToBottom() {
      if (this.scrollRef === null || this.chatBottomRef === null) return;

      this.scrollRef.setScrollPosition(
        'vertical',
        this.chatBottomRef.offsetTop ?? 600,
        200
      );
    },

    selectCategory(category: SupportCategory) {
      this.loading.category = true;

      this.tickets = [];
      this.section = 'list';
      this.pagination.offset = 0;
      this.pagination.page = 1;
      this.pagination.count = 0;
      this.selectedCategory = category;

      clearInterval(interval);
      setQueryParam('category_id', category.id);

      this.updateCategory(category.id, true).then();

      interval = setInterval(
        this.updateCategory.bind(this, category.id),
        config.category_update_time
      );
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

    updateMessages() {
      return fetchSupportMessages('get-messages', {
        ticket_id: this.selectedTicket?.id ?? -1,
        limit: 50,
      });
    },

    changeStatus(
      status: number,
      ticket_id: number,
      action1?: () => void,
      action2?: () => void
    ) {
      if (action1 !== void 0) action1();

      fetchSupportTicket(
        'change-status',
        {
          ticket_id: ticket_id,
          implementer_id: config.user_id,
          status: status,
        },
        (response) => {
          this.tickets = this.tickets.map((ticket) =>
            ticket.id === this.selectedTicket?.id ? response : ticket
          );
        }
      ).then(() => {
        if (action2 !== void 0) action2();
      });
    },

    workStatus(
      status: number,
      ticket_id: number,
      action1?: () => void,
      action2?: () => void
    ) {
      if (ticketStatuses[status].text.length === 0) {
        this.changeStatus(status, ticket_id, action1, action2);

        return;
      }

      useDialog(ticketStatuses[status].text, true).onOk(() => {
        this.changeStatus(status, ticket_id, action1, action2);
      });
    },

    deleteTicket(
      ticket_id: number,
      action1?: () => void,
      action2?: () => void
    ) {
      useDialog('Вы уверены, что хотите удалить тикет?', true).onOk(() => {
        if (action1 !== void 0) action1();
        fetchSupportTicket('delete', { ticket_id: ticket_id }, (response) => {
          if (this.main === 'chat') {
            this.main = 'view';
            clearInterval(interval);
            deleteQueryParam('id');
          }

          this.tickets = response;
          this.selectedTicket = null;
        }).then(() => {
          if (action2 !== void 0) action2();
        });
      });
    },
  },
});
