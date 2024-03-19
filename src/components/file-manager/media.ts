import MediaImage from './MediaImage.vue';
import MediaVideo from './MediaVideo.vue';

export function getMediaComponent(path: string | null) {
  return path === 'video' ? MediaVideo : MediaImage;
}
