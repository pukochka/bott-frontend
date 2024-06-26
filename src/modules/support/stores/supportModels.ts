import { defaultMessage } from 'src/utils/helpers/defaults';

type Interval = string | number | NodeJS.Timeout | undefined;

export interface SupportStore {
  categories: Array<SupportCategory>;
  tickets: Array<SupportTicket>;
  implementers: Array<SupportImplementer>;
  messages: Array<SupportTicketMessage>;

  category: number;
  panel: 'tickets' | 'chat';
  categoryInterval: Interval;
  messagesInterval: Interval;

  search: {
    name: 'user' | 'title';
    value: string;
    tickets: boolean;
    loading: boolean;
    foundingUsers: Array<{ id: string; text: string; title: string }>;
    foundingTickets: Array<SupportTicket>;
    foundingTicketsByTitle: Array<{ id: string; text: string; title: string }>;
  };

  media: {
    width: number;
    height: number;
    link: string;
    isVideo: boolean;
  };

  drawer: boolean;
  splitterModel: number;
  rightSplitterPanel: number;

  loading: {
    start: boolean;
    category: boolean;
    chat: boolean;
  };

  dialogs: Record<DialogNames, boolean>;

  selectedTicket: SupportTicket | null;
  selectedCategory: SupportCategory | null;
  selectedMessage: SupportTicketMessage | null;

  topRef: any;
  scrollRef: any;
  chatBottomRef: any;

  pagination: {
    page: number;
    count: number;
    offset: number;
    limit: number;
  };
}

export type DialogNames =
  | 'transfer_ticket'
  | 'implementor_transfer'
  | 'select_category'
  | 'select_implementer'
  | 'media_player'
  | 'category_add'
  | 'category_log'
  | 'category_implementers'
  | 'category_edit'
  | 'edit_ticket';

export const defaultImplementer: SupportImplementer = {
  id: 0,
  status: 0,
  category_id: 0,
  user: {
    id: 0,
    type: '',
    telegram_id: 0,
    first_name: '',
    link: '',
    last_name: '',
    username: '',
  },
};

export const defaultTicket: SupportTicket = {
  deleted_at: '',
  id: 0,
  category_id: 0,
  accepted_at: '',
  closed_at: '',
  created_at: '',
  offered_at: '',
  last_message: null,
  user: {
    id: 0,
    type: '',
    telegram_id: 0,
    first_name: '',
    link: '',
    last_name: '',
    username: '',
  },
  title: '',
  manager: null,
  status: 0,
};

export const defaultTicketMessage: SupportTicketMessage = {
  id: 0,
  user: {
    id: 0,
    type: '',
    telegram_id: 0,
    first_name: '',
    link: '',
    last_name: '',
    username: '',
  },
  message: defaultMessage,
  ticket_id: 0,
  created_at: '',
  author: 'implementer',
};
