import { defineStore } from 'pinia';
import { MenuStore } from './models';

export const useMenuStore = defineStore('action-menu-store', {
  state: () =>
    ({
      routes: [],
      options: [],

      selectedMain: null,
      selectedOption: null,
      search: [],
    } as MenuStore),
  getters: {
    route(): string | null {
      if (this.is_error) return null;
      else if (this.selectedOption !== null) return this.selectedOption.route;
      else if (this.selectedMain !== null) return this.selectedMain.route;
      else return null;
    },

    is_error: (state): boolean =>
      !state.options?.length &&
      [1, 2].includes(state.selectedMain?.type_value ?? 0),
    is_options: (state): boolean => !!state.options?.length,

    error_text: (state): string => state.selectedMain?.text_not_found ?? '',
    default_text: (state): string =>
      state.selectedMain?.text_value === ''
        ? state.selectedMain?.text ?? ''
        : state.selectedMain?.text_value ?? 'Выбор вложенного действия',
  },
  actions: {},
});
