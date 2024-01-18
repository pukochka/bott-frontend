interface FIMessageIdParam {
  /** */
  message_id: number;
}

interface FITypeParam {
  /** */
  type: number;
}

interface FIIdParam {
  /** */
  id: number | Array<number>;
}

interface FIPublicPrivateParams {
  /** Обновление поля api data */
  public_key: string;
  /** Обновление поля api data */
  private_key: string;
  /** Обновление поля api data */
  private_key_2: string;
}

/**
 *
 * */
declare interface FeedbackIntegrationsQueries {
  /** Выводит настроенные интеграци */
  index: FIMessageIdParam;
  /** Выводит доступные интеграции для добавления */
  access: FIMessageIdParam;
  /** Выводит кол-во созданных интеграций */
  count: FIMessageIdParam;
  /** Создаёт интеграцию */
  create: FIMessageIdParam & FITypeParam;
  /** Удаляет интеграцию(ии) */
  delete: FIMessageIdParam & FIIdParam;
  /** Изменяет интеграцию */
  update: FIMessageIdParam & FIIdParam & FIPublicPrivateParams;
}

declare type FeedbackIntegrationsParams<
  Q extends keyof FeedbackIntegrationsQueries
> = FeedbackIntegrationsQueries[Q];

declare interface FeedbackIntegrationIndex {
  /**  */
  id: number;
  /** */
  type: FeedbackIntegrationAccess;
  /** */
  setting: FIPublicPrivateParams & FIIdParam;
}

declare interface FeedbackIntegrationAccess {
  /** Id */
  id: number;
  /** Название интеграции */
  name: string;
  /** Картинка интеграции */
  image: string;
  /** Описание интеграции */
  description: string;
}
