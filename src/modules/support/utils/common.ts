import PhotoTile from '../components/chat/media-player/tiles/PhotoTile.vue';
import DocumentTile from '../components/chat/media-player/tiles/DocumentTile.vue';
import VideoTile from '../components/chat/media-player/tiles/VideoTile.vue';

export const TG_DESKTOP = 'https://t.me/';
export const TG_API = 'https://api.telegram.org/';
export const mediaComponents: Record<number, any> = {
  1: PhotoTile,
  3: DocumentTile,
  4: VideoTile,
  5: PhotoTile,
};
export const chatColors: Record<number, string> = {
  1: 'linear-gradient(225deg, hsla(31, 91%, 59%, 0.6) 0%, hsla(0, 100%, 67%, 0.6) 50%, hsla(31, 91%, 59%, 0.6) 100%)',
  2: 'linear-gradient(135deg, hsla(91, 68%, 54%, 0.6) 0%, hsla(125, 58%, 45%, 0.6) 50%, hsla(91, 68%, 54%, 0.6) 100%)',
  3: 'linear-gradient(315deg, hsla(209, 100%, 66%, 0.6) 0%, hsla(211, 100%, 50%, 0.6) 50%, hsla(209, 100%, 66%, 0.6) 100%)',
  4: 'linear-gradient(45deg, hsla(37, 100%, 66%,  0.6) 0%, hsla(31, 91%, 59%,  0.6) 50%, hsla(37, 100%, 66%,  0.6) 100%)',
  5: 'linear-gradient(225deg, hsla(186, 33%, 94%,  0.6) 0%, hsla(215, 41%, 79%,  0.6) 50%, hsla(186, 33%, 94%,  0.6) 100%)',
};

const gradient: Record<string, [string, string]> = {
  'channel-filled': ['#50ABFF', '#007AFF'],
  'user-filled': ['#C36EFF', '#8B60FA'],
  'favorite-filled': ['#88D93A', '#30B73B'],
  'group-filled': ['#FFB743', '#F69A36'],
};

export const colors = [
  '#c1121f',
  '#fca311',
  '#588157',
  '#a98467',
  '#7209b7',
  '#619b8a',
  '#f9844a',
  '#6d597a',
  '#ffc9b9',
  '#4c956c',
  '#4c8fa2',
  '#dff71d',
];

export const mediaIcons: Record<number, string> = {
  1: 'image',
  3: 'file',
  4: 'video',
};

export const weekDays: Record<number, string> = {
  0: 'Пн',
  1: 'Вт',
  2: 'Ср',
  3: 'Чт',
  4: 'Пт',
  5: 'Сб',
  6: 'Вс',
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
