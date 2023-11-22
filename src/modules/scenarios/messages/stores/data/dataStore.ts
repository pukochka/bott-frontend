import { defineStore } from 'pinia';

import { DataStore } from './model';
import { useVectorStore } from '../vector/vectorStore';
import { columns } from '../../../../control-products-menu/stores/columns';

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
    /** */
    updateActive() {
      (this.scenarioValue?.columns ?? [])
        .map((column) => column.messages)
        .flat()
        .forEach((message) => (message.active = false));
    },
    deleteMenu(message: MessageFree) {
      const vector = useVectorStore();

      for (const line of message.menu?.lines ?? []) {
        for (const button of line.buttons) {
          vector.deleteConnection('button_id', button.id);
        }
      }
    },
  },
});
