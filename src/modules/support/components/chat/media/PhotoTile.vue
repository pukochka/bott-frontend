<template>
  <div
    class="relative-position q-mt-xs cursor-pointer"
    :style="{ 'min-width': '230px' }"
    @click="openMediaPlayer"
  >
    <q-img
      ref="imageField"
      v-if="!loading"
      :src="url"
      style="max-height: 300px"
      fit="cover"
    />
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { computed, onBeforeMount, ref } from 'vue';

import { defaultMessage } from '../../../../scenarios/messages/stores/defaults';
import { TG_API } from '../../../utils/common';

import { fetchFile } from '../../../api/telegram';
import { useSupportStore } from '../../../stores/supportStore';

const props = withDefaults(defineProps<PhotoTileProps>(), {
  message: () => defaultMessage,
});

const support = useSupportStore();

const loading = ref(true);
const filePath = ref('');
const imageField = ref();

const url = computed(
  () => TG_API + `file/bot${config.bot.token}/${filePath.value}`
);

const openMediaPlayer = () => {
  support.media.link = url.value;

  support.openDialog('media_player');
};

onBeforeMount(() => {
  loading.value = true;

  fetchFile(props.message.photos?.code ?? '', (response) => {
    filePath.value = response.file_path;
  }).then(() => (loading.value = false));
});

interface PhotoTileProps {
  message: MessageFree;
}
</script>

<style scoped lang="scss"></style>
