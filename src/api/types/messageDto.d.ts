declare interface MessageFree {
  id: number;
  title: string;
  text: string;
  text_length: number;

  photos: MessagePhoto | null;
  files: MessageFile | null;
  videos: MessageVideo | null;
  feedback: MessageFeedback<MessageFeedbackItem> | null;
  animations: MessageVideo | null;

  type: MessageType;
  color: MessageColor | null;
  specType: MessageSpecType;
  sort: number | null;
  column_id: number | null;
  active: boolean;
  menu: IMMenu | null;

  is_generate_default: boolean;
  is_copy: boolean;
  is_support_menu: boolean;
  is_duplicate: boolean;
  is_test: boolean;

  breadcrumbs: { crumbs: Array<{ label: string; link: string }> };
  support_types: Record<string, MessageType>;
  constants: Record<string, string>;
  constantAnswers: Record<string, string>;
  faq: MessageFaqDto;
  frontendMenu: Array<MessageFrontendMenuButton>;
}

/** Спец Тип сообщения, ипользуется если сообщение не свободное и используется в какой-то логике */
declare interface MessageSpecType {
  /** 0 - свободное сообщение 30 - Сообщение принадлежит колонне Остальные все специализированные */
  id: number;
  // /** Название спец. типа */
  // title: string;
}

/** Цвет сообщения, используется только в сценариях */
declare interface MessageColor {
  id: number;
  /** Название цвета (красный) */
  title: string;
  /** Значение цвета 2ADC22 */
  color: string;
}

declare interface MessageType {
  id: number;
  type: number;
  label: string;
  description: string;
  path: 'photos' | 'animations' | 'files' | 'videos';
}

declare interface MessageFreeMedia {
  id: number;
  code: string | null;
  host: string;
  abs_path: string;
}

declare interface MessagePhoto extends MessageFreeMedia {
  is_disable_notification: boolean | null;
  is_protect_content: boolean | null;
  is_spoiler: boolean | null;
}

declare interface MessageFile extends MessageFreeMedia {
  is_disable_notification: boolean | null;
  is_protect_content: boolean | null;
  is_disable_content_type_detection: boolean | null;
}

declare interface MessageVideo extends MessageFreeMedia {
  is_support_streaming: boolean | null;
  is_protect_content: boolean | null;
  is_spoiler: boolean | null;
  is_disable_notification: boolean | null;
}

declare interface MessageFaqDto {
  /** Ссылка на видео ютуб */
  video: string;
  /** Текст помощи с поддержкой HTML! */
  text: string;
  /** Ссылки, которые надо вывести */
  links: Array<MessageFaqLink>;
}

declare interface MessageFaqLink {
  /** Ссылка */
  link: string;
  /** Текст ссылки */
  label: string;
}

declare interface MessageFrontendMenuButton {
  /** Ссылка */
  link: string;
  /** Текст ссылки */
  label: string;
  /** Описание кнопки, можно выводить при наведении */
  description: string;
  /** Текст кнопки (primary,success,warning,danger) Для danger выводить подтверждение клика */
  color: string;
}
