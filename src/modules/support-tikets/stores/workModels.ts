export interface WorkStore {
  chat: boolean;
  selectedCategory: Category | null;
  categories: Array<any>;

  section: SectionNames;

  drawer: {
    state: boolean;
    mini: boolean;
  };
}

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
