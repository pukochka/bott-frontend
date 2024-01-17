export interface WorkStore {
  chat: boolean;

  categories: Array<SupportCategory>;
  tickets: Array<SupportTicket>;

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
  };
}

export type DialogNames =
  | 'transfer_ticket'
  | 'executor_transfer'
  | 'select_category'
  | 'edit_ticket';

export type SectionNames =
  | 'list'
  | 'manager'
  | 'select'
  | 'edit'
  | 'create'
  | 'log';

interface Category {
  id: number;
  label: string;
  status: number;
  tickets: Array<any>;
}

export const ticketStatues = {
  0: '',
  1: '',
  2: '',
};
