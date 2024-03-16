<template>
  <div class="col-6 col-sm-3 col-md-2 col-lg-2">
    <q-card
      flat
      bordered
      class="rounded flex-center flex overflow-hidden"
      style="height: 140px"
      @click="select">
      <div class="fit flex flex-center">
        <component
          :is="component"
          :link="props.item.link"
          :name="props.item.name">
          <div
            class="absolute-bottom text-caption text-center image-padding-none row items-center justify-between no-wrap">
            <div class="ellipsis">{{ item.name }}</div>

            <q-checkbox
              dense
              dark
              size="44px"
              :model-value="selected"
              color="primary"
              @click="select($event, true)">
              <q-tooltip anchor="top middle" self="bottom middle">
                Выбрать файл
              </q-tooltip>
            </q-checkbox>
          </div>
        </component>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useFileStore } from '../stores/fileStore';

import { defaultFileCard } from '../stores/fileModels';

import FileImg from './extension/FileImg.vue';
import VideoPreview from './extension/VideoPreview.vue';

const props = withDefaults(defineProps<FileCardProps>(), {
  item: () => defaultFileCard,
});

const data = useFileStore();

const classes = computed(() =>
  data.paths === 'videos' ? 'q-img__content' : ''
);

const component = computed(() =>
  data.paths === 'videos' ? VideoPreview : FileImg
);

const selected = computed(
  () =>
    data.selectedFiles.map((item) => item.link).indexOf(props.item.link) !== -1
);

const select = (e: MouseEvent, checkbox?: boolean) => {
  if (e.ctrlKey || checkbox) {
    data.drawerInfo = true;

    data.selectFile(props.item);

    return;
  }

  data.selectedFiles = !selected.value ? [props.item] : [];

  if (!selected.value) data.drawerInfo = true;
};

interface FileCardProps {
  item: FMItem;
}
</script>

<style lang="scss" scoped>
.image-padding-none {
  padding: 2px !important;
}
</style>
