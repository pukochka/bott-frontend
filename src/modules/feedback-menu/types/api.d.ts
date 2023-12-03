interface FBTypeParam {
  /** Уникальный идентификатор сообщения */
  type: number;
}

interface FBIdArrayParam {
  /** Уникальный идентификатор сообщения */
  id: number | Array<number>;
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
  is_confirm: boolean;
}

interface FBIsMultipleParam {
  /** Уникальный идентификатор сообщения */
  is_multiple: boolean;
}

interface FBTextParam {
  /** Уникальный идентификатор сообщения */
  text: string;
}

interface FBAnswerIdParam {
  /** Идентификатор заявки */
  answer_id: number;
}

interface FBAnswerIdArrayParam {
  /** Идентификатор заявки */
  answer_id: Array<number>;
}

interface FBStatusParam {
  /** Статус заявок, которые надо удалить */
  status: number | null;
}

interface FBLimitParams {
  /** Сколько пропустить */
  offset: number | null;
  /** Лимит загрузки */
  limit: number | null;
}

interface FBUserIdParam {
  /** Идентификатор пользователя */
  user_id: string | null;
}

interface FBAnswerCommonParams extends FBUserIdParam {
  /** Время начала ответа на вопросы (Начало периода поиска) */
  start_created_time: string | null;
  /** Время начала ответа на вопросы (Конец периода поиска) */
  end_created_time: string | null;
  /** Тип сообщения */
  is_answer: boolean | null;
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

interface FBBeforeParams {
  /** Уникальный идентификатор сообщения */
  before_id: number | null;
  before_type: number | null;
}

interface FBPositionParams {
  /** Уникальный идентификатор сообщения */
  pos_x: number | null;
  pos_y: number | null;
}

type FBMessageParams = FBTypeParam & FBInputIdParam;

declare interface FBMainQueries {
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
  /** Добавляет вопрос */
  'create-input': FBTypeParam & FBAfterParams & FBPositionParams;
  /** Добавляет вопрос перед before. Работает также с option */
  'create-input-before': FBTypeParam & FBBeforeParams & FBPositionParams;
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
  'add-crossroad-option': FBInputIdParam &
    FBTextParam &
    FBTypeParam &
    FBPositionParams;
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

declare interface FBAnswerQueries {
  /** Выводит ответы на определённый вопрос */
  index: FBStatusParam & FBLimitParams & FBAnswerCommonParams;
  /** Выводит кол-во ответов на определённый вопрос */
  count: FBStatusParam & FBAnswerCommonParams;
  /** Выводит ответ определённый */
  view: FBAnswerIdParam;
  /** Удаляет заявку(и) */
  delete: FBAnswerIdArrayParam;
  /** Отмечает прочитанным все сообщения, которые имеют статус не прочитаны */
  'read-all': undefined;
  /** Удаляет заявки по статусу */
  'delete-by-status': FBStatusParam;
  /** Изменяет текст заявки пользователя */
  update: FBAnswerIdParam & FBTextParam;
  /** Добавляет ответ к заявке от админа */
  'set-answer': FBAnswerIdParam & FBTextParam;
  /** Отметить заявку, как прочитано */
  read: FBAnswerIdParam;
}

declare interface FBNotificationQueries {
  /** Выводит ответы на определённый вопрос */
  index: FBUserIdParam & FBStatusParam;
  /** Выводит кол-во ответов на определённый вопрос */
  count: FBUserIdParam & FBStatusParam;
  /** Создаёт уведомление */
  create: FBUserIdParam;
  /** Удаляет уведомение(ия */
  delete: FBIdArrayParam;
  /** Изменяет статус уведомение(ия) */
  'change-status': FBIdArrayParam;
}

/**
 * Параметры для запросов main
 * */
declare type FBMainParams<Q extends keyof FBMainQueries> = FBMainQueries[Q];

/**
 * Параметры для запросов answer
 * */
declare type FBAnswerParams<Q extends keyof FBAnswerQueries> =
  FBAnswerQueries[Q];

/**
 * Параметры для запросов notification
 * */
declare type FBNotificationParams<Q extends keyof FBNotificationQueries> =
  FBNotificationQueries[Q];
