import { ref } from 'vue';

import { defineStore } from 'pinia';

import { DialogsNames, InlineStore } from './inlineModels';
import { defaultMessage } from 'src/utils/helpers/defaults';

export const useInlineStore = defineStore('inline-store', {
  state: () =>
    ref({
      settings: [],
      types: [],
      message: defaultMessage,

      combine: {
        messages: [],
        count: 0,
        page: 0,
      },

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
        combine: false,
        combine_message: false,
      },
    } as InlineStore),
  getters: {
    messages: (state): Array<MessageFree> => state.combine.messages,

    menu: (state): IMMenu | null => state.message.menu,
    lines: (state): IMLine[] => state.message.menu?.lines ?? [],

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
