declare interface FBMessage {
  /**
   * Вопросы обратной связи
   */
  items: FBQuestion[];
  /**
   * Настройки обратной связи
   */
  setting: FBSetting | null;
}

declare interface FBQuestion {
  /**
   * Требует ли подтверждение вопрос (можно ли пропустить его)
   */
  confirm: boolean;
  /**
   * Данные вопроса в зависимости от типа вопроса
   */
  data: FBSimpleQuestion | FBFileQuestion | FBQuizQuestion;
  /**
   * Идентификатор обратной связи
   */
  feedback_id: number;
  /**
   * Идентификатор вопроса
   */
  id: number;
  /**
   * Расположение вопроса от 0...
   */
  sort: number;
  /**
   * Текст вопроса
   */
  text: string;
  /**
   * Тип вопроса:
   *
   * - 1 - Обычный вопрос
   * - 2 - Вопрос с файлом
   * - 3 - Опрос
   * */
  type: 1 | 2 | 3;
}

declare interface FBSetting {
  /** */
  button_cancel: string;
  /** */
  button_hello: string;
  /** */
  end_message: string;
  /** */
  is_notice: boolean;
  /** */
  limit_in_period: number;
  /** */
  period: number;
  /** */
  template_answer: string;
  /** */
  template_common: string;
  /** */
  user_limit: number;
}

/**
 * 1 - Обычный вопрос
 **/
declare interface FBSimpleQuestion {
  /**
   * Регулярное выражение проверяющее ответ пользователя
   * */
  validator: string;
  /**
   * Сообщение при неверном ответе пользователя
   * */
  message: string;
}

/**
 * 2 - Вопрос с файлом
 **/
declare interface FBFileQuestion {
  /**
   * Максимальный размер файла пользователя в байтах
   * */
  size: number;
  /**
   *  Разрешенные расширения файлов (через запятую)
   *  */
  extensions: string;
}

/**
 * 3 - Опрос
 **/
declare interface FBQuizQuestion {
  /**
   * Возможно ли несколько ответов
   * */
  is_multiple: boolean;
  /**
   * Вопросы в опросе
   * */
  options: FBQuiz[];
}

/**
 * Вопрос в опросе
 * */
declare interface FBQuiz {
  /**
   * Идентификатор вопроса (для запросов на сервер)
   * */
  id: number;
  /**
   * Расположение вопроса от 0...
   * */
  sort: number;
  /**
   * Текст вопроса
   * */
  text: string;
}
