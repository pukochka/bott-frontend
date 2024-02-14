<template>
  <div class="relative-position" style="width: 250px; height: 250px">
    <div class="text-center text-red" v-if="error">
      Видео не поддерживается...
    </div>

    <video
      class="video-player"
      style="width: 250px; height: 250px"
      v-if="!loading && !error"
    >
      <source :src="url" />
    </video>

    <q-btn
      unelevated
      round
      size="md"
      color="primary"
      :icon="mdiPlay"
      class="absolute-center"
      @click="openMediaPlayer"
    />

    <q-inner-loading :showing="loading" class="bg-card">
      <q-spinner size="40px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { computed, onBeforeMount, ref } from 'vue';

import { TG_API } from '../../../utils/common';
import { defaultMessage } from '../../../../scenarios/messages/stores/defaults';

import { fetchFile } from '../../../api/telegram';
import { mdiPlay } from '@quasar/extras/mdi-v7';
import { useSupportStore } from '../../../stores/supportStore';

const props = withDefaults(defineProps<VideoTileProps>(), {
  message: () => defaultMessage,
});

const support = useSupportStore();

const loading = ref(true);
const filePath = ref('');
const error = ref(false);

const url = computed(
  () => TG_API + `file/bot${config.bot.token}/${filePath.value}`
);

const openMediaPlayer = () => {
  support.media.link = url.value;
  support.media.isVideo = true;

  support.openDialog('media_player');
};

onBeforeMount(() => {
  loading.value = true;

  fetchFile(props.message.videos?.code ?? '', (response) => {
    filePath.value = response.file_path;
  })
    .then(() => (loading.value = false))
    .catch(() => (error.value = true));
});

interface VideoTileProps {
  message: MessageFree;
}
</script>

<style scoped lang="scss"></style>
