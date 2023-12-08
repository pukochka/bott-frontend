<template>
  <div class="rounded bordered overflow-hidden" v-if="message.type.id !== 2">
    <div
      class="relative-position"
      style="height: 130px"
      v-if="[1, 3, 4, 5].includes(message.type.id) && path.length">
      <component :is="type.comp" :name="file.host" :link="file.abs_path" />
    </div>

    <div
      class="q-px-sm q-py-xs"
      :style="{ 'min-height': '29px', background: color }">
      <div class="bott-title__params">
        <div class="ellipsis" v-html="props.message.text"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated } from 'vue';
import { colors } from 'quasar';
import { defaultMessageMedia } from '../../../../../inline/stores/inlineModels';
import { defaultMessage } from '../../../stores/defaults';

import { useVectorStore } from '../../../stores/vector/vectorStore';

import FileImg from '../../../../../file-manager/components/extension/FileImg.vue';
import VideoPreview from '../../../../../file-manager/components/extension/VideoPreview.vue';

const { changeAlpha } = colors;

const props = withDefaults(defineProps<MessageMainProps>(), {
  message: () => defaultMessage,
});

const vector = useVectorStore();

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

const color = computed(() =>
  changeAlpha(props.message.color?.color ?? '#ffffff', 0.3)
);

interface MessageMainProps {
  message: MessageFree;
}

onUpdated(vector.updateConnections);

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
.message-bg {
  background: rgba(25, 118, 210, 0.3);
}
</style>
