<template>
  <div class="row q-gutter-sm q-pa-sm">
    <div
      v-for="(item, index) in data.colors"
      :key="index"
      class="col rounded bordered q-pa-md cursor-pointer relative-position"
      :style="{ 'background-color': '#' + item.color }"
      @click="setColor(item.id)"
    >
      <div class="absolute-center" v-if="color_id === item.id && loading">
        <q-spinner color="white" size="2em" />
      </div>

      <div class="absolute-center" v-if="message?.color?.id === item.id">
        <q-icon size="22px" color="white" name="check" />
      </div>
    </div>
  </div>

  <div
    @click="setColor(null)"
    class="rounded bordered q-pa-xs q-mx-sm q-mb-sm cursor-pointer text-center relative-position"
  >
    <div class="absolute-left" v-if="!color_id && loading">
      <q-spinner color="primary" size="2em" />
    </div>

    <div class="absolute-left" v-if="message?.color === null">
      <q-icon size="22px" color="primary" name="check" />
    </div>

    {{ t('without-filling') }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { t } from 'src/boot/lang';

import { fetchMessage } from '../../api';

import { useDataStore } from '../../stores/data/dataStore';

import { defaultMessage } from '../../stores/deafults';

const props = withDefaults(defineProps<EditColorProps>(), {
  message: () => defaultMessage,
});

const data = useDataStore();

const loading = ref(false);
const color_id = ref<number | null>(null);

const setColor = (color: number | null) => {
  loading.value = true;
  color_id.value = color;

  const colorIndex = data.colors.map((item) => item.id).indexOf(color ?? 0);

  let message = props.message;

  fetchMessage(
    'set-color',
    {
      message_id: props.message.id,
      color_id: color,
    },
    () => {
      message!.color = data.colors[colorIndex] ?? null;
    }
  ).then(() => {
    loading.value = false;
  });
};

interface EditColorProps {
  message: SCMessage;
}
</script>
<style lang="scss"></style>
