interface FBTypeParam {
  /** Уникальный идентификатор сообщения */
  type: number;
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
  next_id: number | null;
  next_type: number | null;
}

interface FBStartParams {
  /** Уникальный идентификатор сообщения */
  start_id: number;
  start_type: number;
}

interface FBAfterParams {
  /** Уникальный идентификатор сообщения */
  after_id: number | null;
  after_type: number | null;
}

interface FBPositionParams {
  /** Уникальный идентификатор сообщения */
  pos_x: number | null;
  pos_y: number | null;
}

type FBMessageParams = FBTypeParam & FBInputIdParam;

declare interface FBQueries {
  /** Удаляет приветсвенное сообщение в обратную связь. Без него будет сразу начинаться вопросы */
  'drop-hello': undefined;
  /** Добавляет приветсвенное сообщение. Без него будет сразу начинаться вопросы */
  'add-hello': undefined;
  /** Удаляет прощание */
  'drop-end': undefined;
  /** Добавляет прощание */
  'add-end': undefined;
  /** Удаляет answerAdmin */
  'add-answer': undefined;
  /** Добавляет сообщение, которое будет отправлено по клику в сообщение администратора с дейсвтием 'Ответит' */
  'drop-answer': undefined;
  /** Удаляет сообщение, которое будет отправлено админу */
  'drop-cancel': undefined;
  /** Добавляет сообщение, которое будет отпраавлено по клику на кнопку отмены */
  'add-cancel': undefined;
  /** Добавляет сообщение, которое будет отправлено администраторам, если пользователь начал проходить вопросы */
  'add-start-admin': undefined;
  /** Удаляет сообщение startAdmin */
  'drop-start-admin': undefined;
  /** Удаляет сообщения уведомления админисратора */
  'drop-notice-admin': undefined;
  /** Добавляет сообщение, которое будет отправлено администратору, если пользователь не закончил проходить вопросы */
  'add-notice-admin': undefined;
  /** Удаляет сообщение notice */
  'drop-notice': undefined;
  /** Добавляет уведомление, которое отправляется польхователю и предлагает продолжить отвечать на вопросы */
  'add-notice': undefined;
  /** Удаляет сообщение администратора */
  'add-admin': undefined;
  /** Добавляет сообщение, которое будет отправлено администратору после прохожденяи всех вопросов */
  'drop-admin': undefined;
  /** Обнволяет настройки сообщения с обратной связью */
  'update-setting': MessageFeedbackSetting;
  /** Доабавляет вопрос */
  'create-input': FBTypeParam & FBAfterParams & FBPositionParams;
  /** Удаляет вопрос */
  'delete-input': FBInputIdParam & FBTypeParam;
  /** Обнволяет координаты позиции вопроса */
  'set-input-position': FBMessageParams & MessageFeedbackPosition;
  /** Устанавливает следующий вопрос */
  'set-input-next': FBNextParams & FBMessageParams;
  /** Устанавливает первый вопрос */
  'set-start-input': FBStartParams;
  /** Устанавливает следующий вопрос */
  'update-input': FBConfirmParam & FBMessageParams & FBTextParam;
  /** Обновляет св-ва текстового вопроса */
  'update-input-text': MessageFeedbackItemInput & FBInputIdParam;
  /** Обновляет св-ва вопроса с выбором ответа */
  'update-input-select': FBInputIdParam & FBIsMultipleParam;
  /** Обновляет св-ва файлового вопроса */
  'update-input-file': MessageFeedbackItemFile & FBInputIdParam;
  /** Добавляет вариант ответа в вопросе select */
  'add-select-option': FBInputIdParam & FBTextParam;
  /** Обновляет вариант ответа в вопросе select */
  'update-select-option': FBOptionIdParam & FBInputIdParam & FBTextParam;
  /** Поднимает вариант ответа в вопросе select */
  'up-select-option': FBOptionIdParam & FBInputIdParam;
  /** Отпускает вариант ответа в вопросе select */
  'down-select-option': FBOptionIdParam & FBInputIdParam;
  /** Отпускает вариант ответа в вопросе select */
  'delete-select-option': FBOptionIdParam & FBInputIdParam;
  /** Добавляет вариант ответа в вопросе crossroad */
  'add-crossroad-option': FBInputIdParam & FBTextParam;
  /** Обновляет вариант ответа в вопросе crossroad */
  'update-crossroad-option': FBInputIdParam & FBTextParam;
  /** Удаляет вариант ответа в вопросе crossroad */
  'delete-crossroad-option': FBOptionIdParam & FBInputIdParam;
  /** Поднимает вариант ответа в вопросе crossroad */
  'up-crossroad-option': FBOptionIdParam & FBInputIdParam;
  /** Отпускает вариант ответа в вопросе crossroad */
  'down-crossroad-option': FBOptionIdParam & FBInputIdParam;
  /** Задает следующий вариант ответа */
  'set-crossroad-option-next': FBNextParams & FBOptionIdParam & FBInputIdParam;
}

declare type FBParams<Q extends keyof FBQueries> = FBQueries[Q];
