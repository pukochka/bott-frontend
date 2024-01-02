import { Notify } from 'quasar';

export function encodeText(text: string) {
  return text
    .replace(/<br>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p>/gi, '')
    .replace(/<p><\/p>/gi, '\n');
}

export function useNotify(message: string) {
  return Notify.create({
    position: 'top',
    message: message,
    classes: 'rounded',
    timeout: 1500,
  });
}

export function historyGo(to: string) {
  const el = document.createElement('a');
  el.href = to;

  el.click();
}
