<template>
  <div class="row justify-center">
    <q-card
      flat
      bordered
      class="rounded relative-position flex flex-center overflow-hidden col-12"
      style="height: 200px"
    >
      <component
        :is="type.comp"
        :name="file.host"
        :link="file.abs_path"
        v-if="path.length"
      >
        <div
          class="absolute-bottom text-caption text-center image-padding-none row items-center justify-between no-wrap"
        >
          <div class="ellipsis">{{ file.host }}</div>

          <q-btn
            dense
            flat
            padding="0"
            color="white"
            icon="download"
            target="_blank"
            :href="file.abs_path"
          />
        </div>
      </component>

      <q-item-label
        v-if="!path.length"
        header
        class="q-pa-none text-center absolute-center text-grey-8 q-pa-lg"
      >
        К сообщению ничего не прикреплено
      </q-item-label>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useInlineStore } from '../stores/inlineStore';
import { defaultMessageMedia } from '../stores/inlineModels';

import FileImg from '../../file-manager/components/extension/FileImg.vue';
import VideoPreview from '../../file-manager/components/extension/VideoPreview.vue';

const inline = useInlineStore();

const ext: Record<number, { path: Paths; comp: any }> = {
  1: { path: 'photos', comp: FileImg },
  3: { path: 'files', comp: FileImg },
  4: { path: 'videos', comp: VideoPreview },
  5: { path: 'animations', comp: FileImg },
};

const type = computed(() => ext[inline.message.type.id]);

const file = computed(
  () => inline.message[type.value.path ?? 'photos'] ?? defaultMessageMedia
);

const path = computed(
  () => inline.message[type.value.path ?? 'photos']?.host ?? ''
);

type Paths = 'photos' | 'files' | 'videos' | 'animations';
</script>

<style lang="scss" scoped>
.image-padding-none {
  padding: 2px !important;
}
</style>
