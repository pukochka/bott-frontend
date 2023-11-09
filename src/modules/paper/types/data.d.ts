declare interface MessageFeedback {
  id: number;
  /**
   * Приветсвие при отправке обратной связи; null - сразу будут начинаться вопросы
   */
  hello: MessageFree | null;
  cancel: MessageFree | null;
  end: MessageFree | null;
  notice: MessageFree | null;
  noticeAdmin: MessageFree | null;
  startAdmin: MessageFree | null;
  answerAdmin: MessageFree | null;
  admin: MessageFree | null;
  /**
   * Вопросы обратной связи
   * */
  inputs: Array<MessageFeedbackItem>;
  /**
   * Связи между сообщениями
   * */
  flow: Array<MessageFeedbackFlow>;
}

declare interface MessageFeedbackItem {
  id: number;
  text: string;
  confirm: boolean;
  sort: number;
  feedback_id: number;
  type: number;
  input: MessageFeedbackItemInput | null;
  file: MessageFeedbackItemFile | null;
  select: MessageFeedbackItemSelect | null;
}

declare interface MessageFeedbackItemInput {
  validator: string;
  message: string;
}

declare interface MessageFeedbackItemFile {
  size: number;
  extensions: string;
}

declare interface MessageFeedbackItemSelect {
  is_multiple: boolean;
  options: Array<MessageFeedbackItemSelectOption>;
}

declare interface MessageFeedbackItemSelectOption {
  id: number;
  text: string;
  sort: number;
}

declare interface MessageFeedbackFlow {
  id: number;
  link: Array<number>;
  design: {
    x: number;
    y: number;
  } | null;
}
