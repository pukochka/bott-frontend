export interface StatusView {
  label: string;
  color: string;
}

export const categoryStatues: Record<string, StatusView> = {
  0: {
    label: 'Не активна',
    color: 'negative',
  },
  1: {
    label: 'Активна',
    color: 'positive',
  },
};

export const ticketStatuses: Record<string, StatusView> = {
  0: {
    label: 'Обратитесь в поддержку',
    color: 'grey',
  },
  1: {
    label: 'Закрыт',
    color: 'negative',
  },
  2: {
    label: 'Открыт',
    color: 'positive',
  },
  3: {
    label: 'Ожидает закрытия',
    color: 'primary',
  },
  4: {
    label: 'Повторно открыт',
    color: 'warning',
  },
  5: {
    label: 'Ожидает менеджера',
    color: 'grey',
  },
};
