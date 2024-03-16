<template>
  <div
    class="relative-position q-mt-xs cursor-pointer"
    :style="{ 'min-width': '230px' }"
    @click="openMediaPlayer"
  >
    <q-img
      :id="'image_' + props.message.id"
      ref="imageField"
      v-if="!loading"
      :src="url"
      style="max-height: 300px"
      fit="cover"
    />
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../../config';
import { computed, onBeforeMount, onUpdated, ref } from 'vue';

import { defaultTicketMessage } from '../../../../stores/supportModels';
import { TG_API } from '../../../../utils/common';

import { fetchFile } from '../../../../api/telegram';
import { useSupportStore } from '../../../../stores/supportStore';

const props = withDefaults(defineProps<PhotoTileProps>(), {
  message: () => defaultTicketMessage,
});

const support = useSupportStore();

const loading = ref(true);
const filePath = ref('');
const imageField = ref();

const url = computed(
  () => TG_API + `file/bot${config.bot.token}/${filePath.value}`
);

const openMediaPlayer = () => {
  const image = <HTMLImageElement>(
    document.querySelector('#image_' + props.message.id + ' img')
  );

  support.media.width = image.naturalWidth;
  support.media.height = image.naturalHeight;

  support.media.link = url.value;
  support.selectedMessage = props.message;

  support.openDialog('media_player');
};

onBeforeMount(() => {
  loading.value = true;

  fetchFile(props.message.message.photos?.code ?? '', (response) => {
    filePath.value = response.file_path;
  }).then(() => (loading.value = false));
});

onUpdated(support.scrollToBottom.bind(support));

interface PhotoTileProps {
  message: SupportTicketMessage;
}
</script>

<style scoped lang="scss"></style>
