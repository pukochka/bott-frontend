import { defineStore } from 'pinia';

import { Dark, LocalStorage } from 'quasar';

import { StyleStoreModel } from 'stores/style/models';

export const useStyleStore = defineStore('style', {
  state: () =>
    ({
      dark: LocalStorage.getItem('dark') ?? false,
      thumbStyle: {
        width: '8px',
        backgroundColor: 'var(--q-primary)',
        borderRadius: '10px',
        border: '4px solid rgba(0, 0, 0, 0)',
        margin: '2px',
      },
    } as StyleStoreModel),
  getters: {},
  actions: {
    toggleTheme() {
      Dark.toggle();
      LocalStorage.set('dark', Dark.isActive);
    },
  },
});
