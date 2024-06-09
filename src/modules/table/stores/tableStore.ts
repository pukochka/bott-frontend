import { defineStore } from 'pinia';
import { TableStore } from './tableModels';
import { defaultPagination } from '../utils/defaults';
import { fetchTable } from '../api/queries';
import { config } from '../config';

export const useTableStore = defineStore('table-store', {
  state: () =>
    ({
      pagination: defaultPagination,

      selected: [],
    } as TableStore),
  getters: {
    mapSelected: (state) => state.selected.map((s) => s.id),
  },
  actions: {
    paginate() {
      const { index, count } = config.table.query;

      return Promise.all([fetchTable(index), fetchTable(count)]);
    },

    select(row: any) {
      const selectedIndex = this.mapSelected.indexOf(row.id);

      if (selectedIndex === -1) {
        this.selected.push(row);

        return;
      }

      this.selected = this.selected.filter(
        (_, index) => index !== selectedIndex
      );
    },
  },
});
