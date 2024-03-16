<template>
  <div class="relative-position q-mt-xs">
    <q-item dense clickable style="width: 200px" :href="url" target="_blank">
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white" :icon="mdiFile" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle2">Файл</q-item-label>
      </q-item-section>

      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Открыть
      </q-tooltip>
    </q-item>

    <q-inner-loading :showing="loading" class="bg-card">
      <q-spinner-gears size="40px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../../../config';
import { computed, onBeforeMount, ref } from 'vue';

import { defaultMessage } from '../../../../../scenarios/messages/stores/defaults';
import { TG_API } from '../../../../utils/common';

import { mdiFile } from '@quasar/extras/mdi-v7';

import { fetchFile } from '../../../../api/telegram';

const props = withDefaults(defineProps<DocumentTileProps>(), {
  message: () => defaultMessage,
});

const loading = ref(true);
const filePath = ref('');

const url = computed(
  () => TG_API + `file/bot${config.bot.token}/${filePath.value}`
);

onBeforeMount(() => {
  loading.value = true;

  fetchFile(props.message.files?.code ?? '', (response) => {
    filePath.value = response.file_path;
  }).then(() => (loading.value = false));
});

interface DocumentTileProps {
  message: MessageFree;
}
</script>

<style scoped lang="scss"></style>
