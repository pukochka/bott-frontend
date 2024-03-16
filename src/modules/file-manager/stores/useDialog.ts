import { Dialog } from 'quasar';
import { grinding } from 'src/utils/helpers/grinding';

export function useDialog(message?: string, cancel?: boolean) {
  const grindingMessage = grinding(message ?? '');

  return Dialog.create({
    title: 'Уведомление',
    message: grindingMessage,
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
