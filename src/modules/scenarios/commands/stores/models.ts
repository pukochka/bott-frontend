export interface CommandsStore {
  commands: Array<SCCommand>;
  dialogs: Record<DialogNames, boolean>;

  types: SCType[];

  selectedCommand: SCCommand | null;

  loading: boolean;
  scenario: boolean;
}

export type DialogNames = 'add_action' | 'add_scenario' | 'edit_action';
