export interface TableStore {
  _rows: Array<any>;
  pagination: {
    page: number;
    count: number;
    offset: number;
    limit: number;
  };
}
