/**
 *
 * */
declare interface FMItem {
  /**
   *
   * */
  name: string;
  /**
   * Ссылка на фото в S3
   * */
  link: string;
  /**
   * Размер фото
   * */
  size: string;
  /**
   * Дата загрузки
   * */
  date: string;
  /**
   *
   * */
  used: boolean;
}

declare interface MessageDTO {
  id: number;
  title: string;
  text: string;
  photos: {
    id: number;
    code: null;
    host: string;
    abs_path: string;
    is_disable_notification: null;
    is_protect_content: null;
    is_spoiler: null;
  };
  files: {
    id: number;
    code: null;
    host: string;
    abs_path: string;
    is_disable_notification: null;
    is_protect_content: null;
    is_spoiler: null;
  };
  type: {
    id: number;
    title: string;
  };
}
