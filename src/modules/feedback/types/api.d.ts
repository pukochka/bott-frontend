// interface FBFeedbackIdParam {
//   /**
//    * Идентификатор
//    * */
//   feedback_id: number;
// }
//
// interface FBInputIdParam {
//   /**
//    * Идентификатор вопроса
//    * */
//   input_id: number;
// }
//
// interface FBOptionIdParam {
//   /**
//    * Идентификатор вопроса
//    * */
//   option_id: number;
// }
//
// interface FBSelectIdParam {
//   /**
//    * input_id
//    * */
//   select_id: number;
// }
//
// interface FBTextParam {
//   /**
//    * Текст вопроса или ответа в зависимости от контекста
//    * */
//   text: string;
// }
//
// interface FBConfirmParam {
//   /**
//    * Нужно ли подтверждение
//    * */
//   confirm: boolean;
// }
//
// interface FBSimpleParams {
//   /**
//    * Проверка
//    * */
//   validator: string;
//   /**
//    * Сообщение при невеном ответе
//    * */
//   message: string;
// }
//
// interface FBFileParams {
//   /**
//    * Размер файла ( в байтах )
//    * */
//   size: number;
//   /**
//    * Допустимые расширения
//    * */
//   extensions: string;
// }
//
// interface FBMultipleParam {
//   /**
//    * Размер файла ( в байтах )
//    * */
//   is_multiple: number;
// }
//
// interface FBTypeParam {
//   /**
//    * Тип вопроса
//    * */
//   type: number;
// }
//
// declare interface FBQueries {
//   /**
//    * Просмотр всей обратной связи
//    * */
//   view: FBFeedbackIdParam;
//
//   /**
//    * Добавить новый вопрос
//    * */
//   'create-input': FBTypeParam;
//
//   /**
//    * Удалить вопрос
//    * */
//   'delete-input': FBTypeParam & FBInputIdParam;
//
//   /**
//    * Изменить тип 1
//    *  */
//   'update-input-text': FBInputIdParam & FBConfirmParam & FBSimpleParams;
//
//   /**
//    * Изменить тип 2
//    * */
//   'update-input-file': FBInputIdParam & FBConfirmParam & FBFileParams;
//
//   /**
//    * Изменить тип 3
//    * */
//   'update-input-select': FBInputIdParam & FBConfirmParam & FBMultipleParam;
//
//   /**
//    * Добавить в тип 3 ответ
//    * */
//   'add-select-option': FBConfirmParam & FBSelectIdParam & FBTextParam;
//
//   /**
//    * Изменить ответ в типе 3
//    * */
//   'update-select-option': FBConfirmParam & FBTextParam & FBOptionIdParam;
//
//   /**
//    * Удалить ответ в типе 3
//    * */
//   'delete-select-option': FBOptionIdParam;
//
//   /**
//    * Изменить расположение вопроса вверх
//    * */
//   'sort-up': FBInputIdParam;
//
//   /**
//    * Изменить расположение вопроса вниз
//    * */
//   'sort-down': FBInputIdParam;
//
//   /**
//    *  Изменить расположение ответа в типе 3 вверх
//    *  */
//   'select-option-up': FBOptionIdParam;
//
//   /**
//    * Изменить расположение ответа в типе 3 вниз
//    * */
//   'select-option-down': FBOptionIdParam;
// }
//
// declare type FBParams<Q extends keyof FBQueries> = FBQueries[Q];
