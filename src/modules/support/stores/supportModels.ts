export interface WorkStore {
  chat: boolean;

  categories: Array<SupportCategory>;
  tickets: Array<SupportTicket>;
  implementers: Array<SupportImplementer>;

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

  pagination: {
    page: number;
    count: number;
    offset: number;
    limit: number;
  };
}

export type DialogNames =
  | 'transfer_ticket'
  | 'executor_transfer'
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
