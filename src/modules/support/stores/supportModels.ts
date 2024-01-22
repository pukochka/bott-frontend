import { defaultMessage } from '../../scenarios/messages/stores/defaults';

export interface WorkStore {
  chat: boolean;

  categories: Array<SupportCategory>;
  tickets: Array<SupportTicket>;
  implementers: Array<SupportImplementer>;
  messages: Array<SupportTicketMessage>;

  section: SectionNames;

  view: 'table' | 'grid';

  drawer: {
    state: boolean;
    mini: boolean;
  };

  loading: {
    start: boolean;
    category: boolean;
  };

  dialogs: Record<DialogNames, boolean>;

  selected: Array<any>;

  selectedTicket: SupportTicket | null;
  selectedCategory: SupportCategory | null;

  scroll: any;
  scroll_bottom: any;

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
  | 'edit_ticket';

export type SectionNames =
  | 'list'
  | 'manager'
  | 'select'
  | 'edit'
  | 'create'
  | 'log';

export const ticketStatues = {
  0: '',
  1: '',
  2: '',
};

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
