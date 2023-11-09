import { defineStore } from 'pinia';

import { MainStore, DialogsNames } from './model';
import { defaultMenu } from './defaults';

export const useMainStore = defineStore('MainStore', {
  state: () =>
    ({
      menuValue: null,

      selectedButton: null,
      selectedLine: null,

      dialogs: {
        add_button: false,
        button_settings: false,
        drag: false,
        main: false,
      },
    } as MainStore),
  getters: {
    menu: (state): RMMenu => state.menuValue ?? defaultMenu,
    replyMenu: (state): RMMenu | null => state.menuValue,
    replyLines: (state): RMLine[] => state.menuValue?.lines ?? [],
  },
  actions: {
    openDialog(name: DialogsNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogsNames) {
      this.dialogs[name] = false;
    },
  },
});
