export interface DataStore {
  category: Array<any>;

  tickets: Array<any>;

  dialogs: Record<DialogNames, boolean>;
}

export type DialogNames = 'view-tickets';
