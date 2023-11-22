<template>
  <div class="rounded bordered overflow-hidden" v-if="message.type.id !== 2">
    <div
      class="relative-position"
      style="height: 130px"
      v-if="[1, 3, 4, 5].includes(message.type.id) && path.length"
    >
      <component :is="type.comp" :name="file.host" :link="file.abs_path">
      </component>
    </div>

    <div class="q-px-sm q-py-xs">
      <div class="bott-title__params">
        <div class="ellipsis" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import FileImg from '../../../../../file-manager/components/extension/FileImg.vue';
import VideoPreview from '../../../../../file-manager/components/extension/VideoPreview.vue';

import { defaultMessageMedia } from '../../../../../inline-menu/stores/inlineModels';
import { defaultMessage } from '../../../stores/deafults';

const props = withDefaults(defineProps<MessageMainProps>(), {
  message: () => defaultMessage,
});

const ext: Record<number, { path: Paths; comp: any }> = {
  1: { path: 'photos', comp: FileImg },
  3: { path: 'files', comp: FileImg },
  4: { path: 'videos', comp: VideoPreview },
  5: { path: 'animations', comp: FileImg },
};

const type = computed(() => ext[props.message.type.id]);

const file = computed(
  () => props.message[type.value.path ?? 'photos'] ?? defaultMessageMedia
);

const path = computed(
  () => props.message[type.value.path ?? 'photos']?.host ?? ''
);

const content = computed(() => props.message.text);

interface MessageMainProps {
  message: MessageFree;
}

type Paths = 'photos' | 'files' | 'videos' | 'animations';
</script>

<style lang="scss" scoped>
.editor-content {
  white-space: nowrap;
  -webkit-line-clamp: 3;
  line-height: 1;
}
.editor-content > br {
  height: 0;
}
</style>
