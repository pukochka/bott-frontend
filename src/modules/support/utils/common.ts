import PhotoTile from '../components/chat/media/PhotoTile.vue';
import DocumentTile from '../components/chat/media/DocumentTile.vue';
import VideoTile from '../components/chat/media/VideoTile.vue';

export const chatColors: Record<number, string> = {
  1: 'linear-gradient(270deg, hsla(31, 91%, 59%, 0.6) 0%, hsla(360, 100%, 67%, 0.6) 100%)',
  2: 'linear-gradient(135deg, hsla(91, 68%, 54%, 0.6) 0%, hsla(125, 58%, 45%, 0.6) 100%)',
  3: 'linear-gradient(180deg, hsla(209, 100%, 66%, 0.6) 0%, hsla(211, 100%, 50%, 0.6) 100%)',
  4: 'linear-gradient(135deg, hsla(37, 100%, 63%, 0.6) 0%, hsla(31, 91%, 59%, 0.6) 100%)',
  5: 'linear-gradient(90deg, hsla(186, 33%, 94%, 0.6) 0%, hsla(216, 41%, 79%, 0.6) 100%)',
};

export const TG_DESKTOP = 'https://t.me/';
export const TG_API = 'https://api.telegram.org/';
export const mediaComponents: Record<number, any> = {
  1: PhotoTile,
  3: DocumentTile,
  4: VideoTile,
  5: PhotoTile,
};

const gradient: Record<string, [string, string]> = {
  'channel-filled': ['#50ABFF', '#007AFF'],
  'user-filled': ['#C36EFF', '#8B60FA'],
  'favorite-filled': ['#88D93A', '#30B73B'],
  'group-filled': ['#FFB743', '#F69A36'],
};

export const months: Record<number, string> = {
  0: 'Января',
  1: 'Февраля',
  2: 'Марта',
  3: 'Апреля',
  4: 'Мая',
  5: 'Июня',
  6: 'Июля',
  7: 'Августа',
  8: 'Сентября',
  9: 'Октября',
  10: 'Ноября',
  11: 'Декабря',
};

export function parseContent(content: string): string {
  if ((content ?? '').includes('style')) {
    const el = document.createElement('div');
    el.innerHTML = content;

    // eslint-disable-next-line prefer-rest-params,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nodeList: Array<HTMLElement> = Array.from(el?.childNodes ?? []);

    if (!nodeList?.length) return el?.innerHTML;

    for (const node of nodeList) {
      node?.attributes?.removeNamedItem('style');

      node.innerHTML = parseContent(node.innerHTML);
    }

    return el?.innerHTML ?? '';
  }

  return content;
}
