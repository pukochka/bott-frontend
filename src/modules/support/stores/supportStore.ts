import { config } from '../config';

import { defineStore } from 'pinia';
import { DialogNames, SupportStore } from './supportModels';
import { fetchSupportMessages, fetchSupportTicket } from '../api/queries';

import { useDialog } from 'src/utils/use/useDialog';
import { deleteQueryParam, setQueryParam } from 'src/utils/helpers/string';
import { getRect } from 'src/utils/helpers/dom';

import { ticketStatuses } from '../utils/messageMeta';

export const useSupportStore = defineStore('support', {
  state: () =>
    ({
      categories: [],
      tickets: [],
      implementers: [],
      messages: [],

      category: 0,
      panel: 'tickets',
      categoryInterval: undefined,
      messagesInterval: undefined,

      search: {
        name: 'user',
        value: '',
        loading: false,
        tickets: false,
        foundingUsers: [],
        foundingTickets: [],
        foundingTicketsByTitle: [],
      },

      media: {
        width: 100,
        height: 100,
        link: '',
        isVideo: false,
      },

      drawer: false,
      splitterModel: 50,
      rightSplitterPanel: 651,

      dialogs: {
        edit_ticket: false,
        select_category: false,
        implementor_transfer: false,
        transfer_ticket: false,
        select_implementer: false,
        media_player: false,
        category_implementers: false,
        category_edit: false,
        category_add: false,
        category_log: false,
      },

      selectedTicket: null,
      selectedCategory: null,
      selectedMessage: null,

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
    } as SupportStore),
  getters: {
    offsetTop: (state): number => state.topRef?.top + 6 ?? 500,
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
      this.messages = [];
      this.panel = 'chat';
      this.loading.chat = true;
      this.selectedTicket = ticket;

      setQueryParam('id', ticket.id);

      this.updateMessages().then(() => {
        this.loading.chat = false;
        setTimeout(this.scrollToBottom.bind(this), 100);
      });

      clearInterval(this.messagesInterval);
      this.messagesInterval = setInterval(
        this.updateMessages.bind(this),
        config.messages_update_time
      );
    },
    closeChat() {
      this.messages = [];
      this.panel = 'tickets';
      this.drawer = false;
      this.selectedTicket = null;

      deleteQueryParam('id');
      clearInterval(this.messagesInterval);
    },

    clearSearch() {
      this.search.value = '';
      this.search.foundingTickets = [];
      this.search.foundingUsers = [];
      this.search.loading = false;
      this.search.tickets = false;
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
      this.pagination.offset = 0;
      this.pagination.page = 1;
      this.pagination.count = 0;
      this.category = category.id;
      this.selectedCategory = category;
      this.clearSearch();

      setQueryParam('category_id', category.id);
      this.updateCategory(category.id, true).then();

      clearInterval(this.categoryInterval);
      this.categoryInterval = setInterval(
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
          deleteQueryParam('id');
          clearInterval(this.messagesInterval);

          this.tickets = response;
          this.selectedTicket = null;
        }).then(() => {
          if (action2 !== void 0) action2();
        });
      });
    },

    updateChatActionButtons(percent: number) {
      const { width } = getRect('support-chat-card') ?? { width: 200 };

      this.rightSplitterPanel = ((100 - percent) / 100) * width;
    },
  },
});
