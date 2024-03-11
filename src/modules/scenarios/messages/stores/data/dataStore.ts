import { defineStore } from 'pinia';

import { DataStore } from './model';

export const useDataStore = defineStore('data', {
  state: () =>
    ({
      scenarioValue: null,

      colors: [],
      types: [],

      selectedButton: null,
      selectedLine: null,
      selectedMenu: null,

      selectedMessage: null,
      selectedColumn: null,
    } as DataStore),
  getters: {
    messages: (state) =>
      (state.scenarioValue?.columns ?? [])
        .map((column) => column.messages)
        .flat(),
  },
  actions: {
    updateActive() {
      (this.scenarioValue?.columns ?? [])
        .map((column) => column.messages)
        .flat()
        .forEach((message) => (message.active = false));
    },
  },
});
