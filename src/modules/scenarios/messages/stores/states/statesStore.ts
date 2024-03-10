import { defineStore } from 'pinia';

import type { StatesStore, DialogNames } from './model';

import { Dragging } from '../classes';

export const useStatesStore = defineStore({
  id: 'StatesStore',
  state: () =>
    ({
      loading: false,
      dialogs: {
        add_button: false,
        add_message: false,

        edit_label: false,
        edit_message: false,
        edit_button: false,
        edit_feedback: false,
        edit_text_command: false,
        edit_text_message: false,
        draggable: false,
        settings_button: false,
        change_type: false,

        connection: false,
        action: false,
        timer: false,

        color: false,
      },

      initialization: {
        data: false,
        lines: false,
      },

      dragValue: new Dragging(),
    } as StatesStore),
  getters: {
    start: (state) => !state.initialization.data || !state.initialization.lines,
  },
  actions: {
    openDialog(name: DialogNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogNames) {
      this.dialogs[name] = false;
    },

    startDrag(event: MouseEvent, element: MessageFree) {
      document.addEventListener('mousemove', this.dragMove, false);
      document.addEventListener('mouseup', this.endDrag, false);

      this.dragValue.el = element;
      this.dragValue.applyDrag(event);
    },
    dragMove(event: MouseEvent) {
      this.dragValue.applyDrag(event);
    },
    endDrag() {
      document.removeEventListener('mousemove', this.dragMove, false);
      document.removeEventListener('mouseup', this.endDrag, false);

      this.dragValue.el = null;
    },
  },
});
