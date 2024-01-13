export interface WorkStore {
  chat: boolean;

  categories: Array<any>;

  section: SectionNames;

  view: 'table' | 'grid';

  drawer: {
    state: boolean;
    mini: boolean;
  };

  dialogs: Record<DialogNames, boolean>;

  selected: Array<any>;

  selectedTicket: any | null;
  selectedCategory: Category | null;
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
