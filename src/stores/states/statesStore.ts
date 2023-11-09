import { defineStore } from 'pinia';

import { StatesStoreModel } from './models';

export const useStatesStore = defineStore('states', {
  state: () =>
    ({
      drawer: false,
      toc: false,
      menu: false,

      loading: false,

      props: {},
    } as StatesStoreModel),
  getters: {},
  actions: {
    toggleDrawer() {
      this.drawer = this.drawer === false;
    },
    toggleToc() {
      this.toc = this.toc === false;
    },
    toggleMenu() {
      this.menu = this.menu === false;
    },

    load() {
      this.loading = true;
    },
    loadEnd() {
      this.loading = false;
    },
  },
});
