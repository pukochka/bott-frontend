import { ref } from 'vue';

import { defineStore } from 'pinia';

import { defaultMessageFree, DialogsNames, InlineStore } from './inlineModels';

export const useInlineStore = defineStore('inline-store', {
  state: () =>
    ref({
      settings: [],
      types: [],
      message: defaultMessageFree,

      selectedButton: null,
      selectedLine: null,

      bot_id: 0,
      host: '',
      token: '',
      scenarios: false,

      dialogs: {
        add_button: false,
        button_settings: false,
        drag: false,
        editor: false,
        edit_type_message: false,
      },
    } as InlineStore),
  getters: {
    inlineMenu: (state): IMMenu | null => state.message.menu,
    inlineLines: (state): IMLine[] => state.message.menu?.lines ?? [],

    mappedKeys: (state) =>
      Object.fromEntries(state.settings.map((item) => [item.key, item.value])),
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
