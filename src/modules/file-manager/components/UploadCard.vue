<template>
  <div class="col-6 col-sm-4">
    <q-card flat bordered class="rounded overflow-hidden" style="height: 120px">
      <component
        :is="component"
        :link="props.item.result"
        :name="props.item.name">
        <div
          class="absolute-bottom text-caption text-center image-padding-none">
          <div class="ellipsis">{{ item.name }}</div>
        </div>
      </component>

      <q-btn
        dense
        round
        unelevated
        size="md"
        color="red"
        icon="close"
        class="q-ma-xs absolute-top-right"
        v-if="!loading && !onload"
        @click="deleteUpload" />

      <q-inner-loading :showing="loading && !onload">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>

      <q-inner-loading :showing="!loading && onload">
        <q-icon name="check" color="primary" size="50px" />
      </q-inner-loading>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import { useFMStore } from '../stores/FMStrore';

import FileImg from './extension/FileImg.vue';
import VideoPreview from './extension/VideoPreview.vue';

const props = withDefaults(defineProps<UploadCardProps>(), {
  item: () => {
    return {
      size: 0,
      result: '',
      id: -1,
      name: '',
    };
  },
});

const data = useFMStore();

const component = computed(() =>
  data.paths === 'videos' ? VideoPreview : FileImg
);
const classes = computed(() =>
  data.paths === 'videos' ? 'q-img__content' : ''
);

const onload = ref(false);
const loading = computed(() => data.uploadStack.includes(props.item.id));

watch(loading, (value) => {
  onload.value = !value;

  if (onload.value) {
    setTimeout(() => data.uploadFiles.pop(), 5000);
  }
});

const deleteUpload = () => {
  data.deleteUpload(props.item.id);
};

interface UploadCardProps {
  item: {
    result: any;
    size: number;
    id: number;
    name: string;
  };
}
</script>

<style lang="scss" scoped>
.image-padding-none {
  padding: 2px !important;
}
</style>
