import { defineStore } from 'pinia';
import { DataStore, DialogNames } from './models';

export const useDataStore = defineStore('data-commands-store', {
  state: () =>
    ({
      commands: [],
      dialogs: {
        add_action: false,
        add_scenario: false,
        edit_action: false,
      },

      types: [],

      selectedCommand: null,

      loading: true,
    } as DataStore),
  getters: {
    actions: (state) => state.commands.filter((command) => !command.is_column),
    scenarios: (state) => state.commands.filter((command) => command.is_column),
  },
  actions: {
    openDialog(name: DialogNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogNames) {
      this.dialogs[name] = false;
    },
  },
});
