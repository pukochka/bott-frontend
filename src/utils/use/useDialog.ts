import { Dialog } from 'quasar';

export function useDialog(message?: string, cancel?: boolean) {
  return Dialog.create({
    title: 'Уведомление',
    message: message,
    class: 'rounded no-shadow bordered',
    html: true,
    ok: {
      unelevated: true,
      noCaps: true,
      class: 'rounded',
      color: 'primary',
    },
    cancel: cancel
      ? {
          unelevated: true,
          noCaps: true,
          label: 'Отмена',
          color: 'red',
          class: 'rounded',
        }
      : undefined,
  });
}
