export interface TableStore {
  pagination: {
    page: number;
    count: number;
    offset: number;
    limit: number;
  };

  selected: Array<any>;
}
