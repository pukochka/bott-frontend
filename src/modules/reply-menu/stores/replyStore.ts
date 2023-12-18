import { defineStore } from 'pinia';

import { ReplyStore, DialogsNames } from './replyModels';
import { defaultMenu } from '../utils/defaults';

export const useReplyStore = defineStore('reply', {
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
    } as ReplyStore),
  getters: {
    menu: (state): RMMenu => state.menuValue ?? defaultMenu,
    lines: (state): RMLine[] => state.menuValue?.lines ?? [],
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
