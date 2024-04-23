import { defineStore } from 'pinia';
import { TableStore } from './tableModels';
import { defaultPagination } from '../utils/defaults';
import { fetchTable } from '../api/queries';
import { config } from '../config';

export const useTableStore = defineStore('table-store', {
  state: () =>
    ({
      _rows: [],
      pagination: defaultPagination,
    } as TableStore),
  getters: {},
  actions: {
    zeroizePagination() {
      this.
    },

    paginate() {
      return Promise.all([
        fetchTable(config.table.query.index),
        fetchTable(config.table.query.count),
      ]);
    },
  },
});
