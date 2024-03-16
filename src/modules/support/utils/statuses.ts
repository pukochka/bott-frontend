export interface StatusView {
  label: string;
  color: string;
  text: string;
}

export const ticketStatuses: Record<string, StatusView> = {
  0: {
    label: 'Обратитесь в поддержку',
    color: 'grey',
    text: '',
  },
  1: {
    label: 'Закрыт',
    color: 'red',
    text: 'Вы уверены, что хотите закрыть тикет?',
  },
  2: {
    label: 'Открыт',
    color: 'positive',
    text: '',
  },
  3: {
    label: 'Ожидает закрытия',
    color: 'primary',
    text: 'Вы уверены, что хотите предложить закрыть тикет?',
  },
  4: {
    label: 'Повторно открыт',
    color: 'warning',
    text: '',
  },
  5: {
    label: 'Ожидает менеджера',
    color: 'grey',
    text: '',
  },
};
