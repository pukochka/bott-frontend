import { Notify } from 'quasar';

export function useNotify(message: string) {
  return Notify.create({
    position: 'top',
    message: message,
    classes: 'rounded',
    timeout: 1500,
  });
}
