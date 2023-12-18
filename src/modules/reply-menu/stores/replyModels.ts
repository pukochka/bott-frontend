export interface ReplyStore {
  menuValue: RMMenu | null;

  selectedButton: RMButton | null;
  selectedLine: number | null;

  dialogs: Record<DialogsNames, boolean>;
}

export type DialogsNames = 'drag' | 'add_button' | 'main' | 'button_settings';
