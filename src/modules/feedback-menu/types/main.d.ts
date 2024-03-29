declare interface MessageFeedback<Q> {
  id: number;
  /** Приветсвие при отправке обратной связи; null - сразу будут начинаться вопросы */
  hello: MessageFree | null;
  cancel: MessageFree | null;
  end: MessageFree | null;
  notice: MessageFree | null;
  noticeAdmin: MessageFree | null;
  startAdmin: MessageFree | null;
  answerAdmin: MessageFree | null;
  admin: MessageFree | null;
  setting: MessageFeedbackSetting;
  start: MessageFeedbackNextItem | null;
  /** Вопросы обратной связи */
  inputs: Array<Q>;
}

declare interface MessageFeedbackSetting {
  /** Отправлять ли уведомления ответов админам */
  is_notice: boolean;
  /** Кол-во ответов принимаемых от одного пользователя; 0 - безлимит */
  user_limit: number;
  /** Через сколько минут удалить ответы на вопросы, если ответы остались незавершенные; 0 - не удалять (Удалится по окончанию тарифа) */
  time_notice: number;
  /** Через сколько минут напомнить ответить на вопросы, если ответы остались незавершенные; 0 - не напоминать */
  time_cancel: number;
  /** Количество ответов от одного пользователя за период; 0 - безлимит */
  limit_in_period: number;
  /** Период в минутах; 0 - безлимит */
  period: number;
  /** Текст в кнопке, когда отвечают на вопрос. После клика на кнопку ответ будет отменен. И отправится сообщение cancel (Если создано) */
  button_cancel: string;
  /** Шаблон ответа. Будет применен для каждого ответа пользваотеля. И затем заменит поле {ANSWERS} */
  template_answer: string;
  /** Текст автоматически отправляемый после прочитывания заявки (Смены статуса заявки на прочитано из не прочитано)  */
  message_answer_read: string;
  /** Текст автоматически отправляемый после удаления заявки (Отправляется только если удаляется заявка младше 3-х дней и статусов кроме "отвечен") */
  message_answer_delete: string;
  /** Текст автоматически отправляемый в ответ менеджера на заявку */
  message_answer_for_user: string;
}

declare interface MessageFeedbackItem {
  id: number;
  text: string;
  /** Обязательный ли вопрос */
  confirm: boolean;
  sort: number;
  feedback_id: number;
  type: number;
  /** Позиция вопроса по координатам. null - позиция стандартная! */
  position: MessageFeedbackPosition | null;
  /** Какой выводить слудующий вопрос, если null, то завершается обратная связь (За исключением CROSSROAD) */
  next: MessageFeedbackNextItem | null;
  /** Вопрос с запросом текста */
  input: MessageFeedbackItemInput | null;
  /** Вопрос с запросом файла */
  file: MessageFeedbackItemFile | null;
  /** Специальные настройки при выборе ответа */
  select: MessageFeedbackItemSelect | null;
  /** Переключатель между ветками вопросов */
  crossroad: MessageFeedbackCrossroad | null;
}

declare interface MessageFeedbackPosition {
  x: number;
  y: number;
}

declare interface MessageFeedbackNextItem {
  id: number;
  /** type следующего вопроса */
  type: number;
}

declare interface MessageFeedbackItemInput {
  /** Валидация сообщения клиента. При пустой строке, не проверяется */
  validator: string;
  /** Текст отправляемый, если валидация не пройдена */
  message: string;
}

declare interface MessageFeedbackItemFile {
  /** Максимальный размер принимаемого файла в байтах */
  size: number;
  /** Поддерживаемые расширения через запятую, при пустой строке, не проверяется */
  extensions: string;
  /** Поддерживает ли несколько файлов */
  is_multiple: boolean;
}

declare interface MessageFeedbackCrossroad {
  options: Array<MessageFeedbackCrossroadOption>;
}

declare interface MessageFeedbackCrossroadOption {
  id: number;
  /** Позиция в меню */
  sort: number;
  /** Текст кнопки (варианта ответа) */
  text: string;
  /** Направление кнопки для её передвижения */
  next: MessageFeedbackNextItem;
}

declare interface MessageFeedbackItemSelect {
  /** Поддерживается ли мультивыбор ответов */
  is_multiple: boolean;
  /** Кнопки вариантов ответа */
  options: Array<MessageFeedbackItemSelectOption>;
}

declare interface MessageFeedbackItemSelectOption {
  id: number;
  text: string;
  sort: number;
}
