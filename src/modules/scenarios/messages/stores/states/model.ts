import { Dragging } from '../classes';

export interface StatesStore {
  dialogs: Record<DialogNames, boolean>;

  loading: boolean;

  dragValue: Dragging;

  initialization: {
    data: boolean;
    lines: boolean;
  };
}

export type DialogNames =
  | 'add_button'
  | 'add_message'
  | 'edit_label'
  | 'edit_button'
  | 'edit_feedback'
  | 'edit_text_command'
  | 'edit_text_message'
  | 'change_type'
  | 'settings_button'
  | 'connection'
  | 'action'
  | 'color'
  | 'draggable';
