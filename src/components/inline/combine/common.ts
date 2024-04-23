export const messageFreeTypes: Record<
  number,
  { label: string; color: string }
> = {
  0: { label: 'Текстовое сообщение', color: 'positive' },
  1: { label: 'Сообщение с картинкой', color: 'secondary' },
  2: { label: 'Обратная связь', color: 'primary' },
  3: { label: 'Сообщение-файл', color: 'positive' },
  4: { label: 'Сообщение c видео', color: 'primary' },
  5: { label: 'Сообщение c анимацией(gif)', color: 'primary' },
  6: { label: 'Сообщение стикер', color: 'primary' },
  7: { label: 'Таймер отправки', color: 'positive' },
};
