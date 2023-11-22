export interface DataStore {
  scenarioValue: SCCommandView | null;

  colors: SCColor[];
  types: SCType[];

  selectedButton: IMButton | null;
  selectedLine: number | null;
  selectedMenu: IMMenu | null;

  selectedMessage: MessageFree | null;
  selectedColumn: SCColumn | null;
}

export interface SCFeedback {
  message_id: number;
  feedback: FBMessage;
}
