<template>
  <div class="row justify-center" v-if="visible">
    <q-card
      v-if="host.length || !props.scenarios"
      flat
      :square="props.scenarios"
      :bordered="!props.scenarios"
      class="relative-position flex flex-center overflow-hidden col-12"
      :class="[props.scenarios ? '' : ' rounded']"
      :style="{ height: props.scenarios ? '130px' : '200px' }"
    >
      <component
        v-if="host.length"
        :is="component"
        :name="messageMedia.host"
        :link="messageMedia.abs_path"
        :scenarios="props.scenarios"
      >
        <div
          class="absolute-bottom text-caption text-center image-padding-none row items-center justify-between no-wrap"
        >
          <div class="ellipsis">{{ messageMedia.host }}</div>

          <q-btn
            dense
            flat
            padding="0"
            color="white"
            icon="download"
            target="_blank"
            :href="messageMedia.abs_path"
          />
        </div>
      </component>

      <q-item-label
        v-if="!host.length"
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

import {
  defaultMessage,
  defaultMessageMedia,
} from 'src/utils/helpers/defaults';
import { getMediaComponent } from './media';

const props = withDefaults(defineProps<AssignedMediaProps>(), {
  message: () => defaultMessage,
  scenarios: false,
});

const visible = computed(() => [1, 3, 4, 5].includes(props.message.type.id));
const component = computed(() => getMediaComponent(props.message.type.path));

const messageMedia = computed(
  () => props.message[props.message.type.path] || defaultMessageMedia
);
const host = computed(() => messageMedia.value.host || '');

interface AssignedMediaProps {
  message: MessageFree;
  scenarios?: boolean;
}
</script>

<style lang="scss" scoped>
.image-padding-none {
  padding: 2px !important;
}
</style>
