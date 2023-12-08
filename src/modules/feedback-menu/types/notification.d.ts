/** Уведолмение, кому отправлять */
declare interface FeedbackNotification {
  id: number;
  user: BOTTUser;
  /** Статус уведомления false - не отправлять true - отправлять */
  status: boolean;
}
