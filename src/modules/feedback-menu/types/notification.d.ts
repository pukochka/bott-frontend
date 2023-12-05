/** Уведолмение, кому отправлять */
declare interface FeedbackNotification {
  id: 123;
  user: BOTTUser;
  /** Статус уведомления false - не отправлять true - отправлять */
  status: true;
}
