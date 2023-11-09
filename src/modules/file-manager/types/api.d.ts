/**
 * Общие параметры:
 * - bot_id (POST)
 * - token (GET)
 * */

interface FMLinkParam {
  /**
   * Ссылка на фото в S3
   * */
  link: string;
}

interface FMIdParam {
  /**
   * ID свободного сообщения
   * */
  id: number;
}

interface FMDeleteParams {
  /**
   * Раздел
   * */
  path: string;
  /**
   * Раздел
   * */
  file_name: string;
}

interface FMUploadParams {
  /**
   * Название фото в виде: “name.jpg”
   * */
  name: string;
  /**
   * Фото в base64
   * */
  file: string;
  /**
   *
   * */
  path: string;
}

declare interface FMQueries {
  /**
   * Получить все фото в боте
   * */
  index: undefined;
  /**
   * Загрузить фото
   * */
  'main/upload': FMUploadParams;
  /**
   * Добавить фото к сообщению/категории/товару
   * */
  assign: FMLinkParam & FMIdParam;
  /**
   * Удалить фото
   * */
  'main/delete': FMDeleteParams;
  /**
   * Удалить неиспользованные фото
   * */
  'delete-unused': undefined;
}

declare type FMParams<Q extends keyof FMQueries> = FMQueries[Q];
