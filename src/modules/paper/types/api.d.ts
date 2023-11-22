declare interface FBMessageIdParam {
  /** Уникальный идентификатор сообщения */
  message_id: number;
}

interface FBTypeParam {
  /** Уникальный идентификатор сообщения */
  type: keyof MessageFeedbackMessageType;
}

interface FBInputIdParam {
  /** Уникальный идентификатор сообщения */
  input_id: number;
}

interface FBOptionIdParam {
  /** Уникальный идентификатор сообщения */
  option_id: number;
}

interface FBConfirmParam {
  /** Уникальный идентификатор сообщения */
  confirm: boolean;
}

interface FBIsMultipleParam {
  /** Уникальный идентификатор сообщения */
  is_multiple: boolean;
}

interface FBTextParam {
  /** Уникальный идентификатор сообщения */
  text: string;
}

interface FBNextParams {
  /** Уникальный идентификатор сообщения */
  next_id: number;
  next_type: number;
}

interface FBStartParams {
  /** Уникальный идентификатор сообщения */
  start_id: number;
  start_type: number;
}

type FBMessageParams = FBTypeParam & FBMessageIdParam & FBInputIdParam;

declare interface FBQueries {
  /** Удаляет приветсвенное сообщение в обратную связь. Без него будет сразу начинаться вопросы */
  'drop-hello': FBMessageIdParam;
  /** Добавляет приветсвенное сообщение. Без него будет сразу начинаться вопросы */
  'add-hello': FBMessageIdParam;
  /** Удаляет прощание */
  'drop-end': FBMessageIdParam;
  /** Добавляет прощание */
  'add-end': FBMessageIdParam;
  /** Удаляет answerAdmin */
  'add-answer': FBMessageIdParam;
  /** Добавляет сообщение, которое будет отправлено по клику в сообщение администратора с дейсвтием 'Ответит' */
  'drop-answer': FBMessageIdParam;
  /** Удаляет сообщение, которое будет отправлено админу */
  'drop-cancel': FBMessageIdParam;
  /** Добавляет сообщение, которое будет отпраавлено по клику на кнопку отмены */
  'add-cancel': FBMessageIdParam;
  /** Добавляет сообщение, которое будет отправлено администраторам, если пользователь начал проходить вопросы */
  'add-start-admin': FBMessageIdParam;
  /** Удаляет сообщение startAdmin */
  'drop-start-admin': FBMessageIdParam;
  /** Удаляет сообщения уведомления админисратора */
  'drop-notice-admin': FBMessageIdParam;
  /** Добавляет сообщение, которое будет отправлено администратору, если пользователь не закончил проходить вопросы */
  'add-notice-admin': FBMessageIdParam;
  /** Удаляет сообщение notice */
  'drop-notice': FBMessageIdParam;
  /** Добавляет уведомление, которое отправляется польхователю и предлагает продолжить отвечать на вопросы */
  'add-notice': FBMessageIdParam;
  /** Удаляет сообщение администратора */
  'add-admin': FBMessageIdParam;
  /** Добавляет сообщение, которое будет отправлено администратору после прохожденяи всех вопросов */
  'drop-admin': FBMessageIdParam;
  /** Обнволяет настройки сообщения с обратной связью */
  'update-setting': MessageFeedbackSetting & FBMessageIdParam;
  /** Доабавляет вопрос */
  'create-input': FBTypeParam & FBMessageIdParam;
  /** Удаляет вопрос */
  'delete-input': FBInputIdParam & FBTypeParam & FBMessageIdParam;
  /** Обнволяет координаты позиции вопроса */
  'set-input-position': FBMessageParams & MessageFeedbackPosition;
  /** Устанавливает следующий вопрос */
  'set-input-next': FBNextParams & FBMessageParams;
  /** Устанавливает первый вопрос */
  'set-start-input': FBStartParams & FBMessageIdParam;
  /** Устанавливает следующий вопрос */
  'update-input': FBConfirmParam & FBMessageParams & FBTextParam;
  /** Обновляет св-ва текстового вопроса */
  'update-input-text': MessageFeedbackItemInput &
    FBInputIdParam &
    FBMessageIdParam;
  /** Обновляет св-ва вопроса с выбором ответа */
  'update-input-select': FBInputIdParam & FBMessageIdParam & FBIsMultipleParam;
  /** Обновляет св-ва файлового вопроса */
  'update-input-file': MessageFeedbackItemFile &
    FBInputIdParam &
    FBMessageIdParam;
  /** Добавляет вариант ответа в вопросе select */
  'add-select-option': FBInputIdParam & FBMessageIdParam & FBTextParam;
  /** Обновляет вариант ответа в вопросе select */
  'update-select-option': FBOptionIdParam &
    FBInputIdParam &
    FBMessageIdParam &
    FBTextParam;
  /** Поднимает вариант ответа в вопросе select */
  'up-select-option': FBOptionIdParam & FBInputIdParam & FBMessageIdParam;
  /** Отпускает вариант ответа в вопросе select */
  'down-select-option': FBOptionIdParam & FBInputIdParam & FBMessageIdParam;
  /** Отпускает вариант ответа в вопросе select */
  'delete-select-option': FBOptionIdParam & FBInputIdParam & FBMessageIdParam;
  /** Добавляет вариант ответа в вопросе crossroad */
  'add-crossroad-option': FBInputIdParam & FBMessageIdParam & FBTextParam;
  /** Обновляет вариант ответа в вопросе crossroad */
  'update-crossroad-option': FBInputIdParam & FBMessageIdParam & FBTextParam;
  /** Удаляет вариант ответа в вопросе crossroad */
  'delete-crossroad-option': FBOptionIdParam &
    FBInputIdParam &
    FBMessageIdParam;
  /** Поднимает вариант ответа в вопросе crossroad */
  'up-crossroad-option': FBOptionIdParam & FBInputIdParam & FBMessageIdParam;
  /** Отпускает вариант ответа в вопросе crossroad */
  'down-crossroad-option': FBOptionIdParam & FBInputIdParam & FBMessageIdParam;
  /** Задает следующий вариант ответа */
  'set-crossroad-option-next': FBNextParams &
    FBOptionIdParam &
    FBInputIdParam &
    FBMessageIdParam;
}

declare type FBParams<Q extends keyof FBQueries> = FBQueries[Q];
