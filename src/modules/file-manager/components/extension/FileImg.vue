<template>
  <q-img
    :fit="data.imageFit"
    class="fit cursor-pointer non-selectable"
    :src="current"
    @error="onErr"
    spinner-color="primary"
    spinner-size="42px"
    :img-style="err !== 'img' ? style : {}">
    <slot></slot>
  </q-img>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { extensions } from '../../stores/FMmodels';

import { useFMStore } from '../../stores/FMStrore';

const props = withDefaults(defineProps<ImageImgProps>(), {
  link: '',
  name: '',
});

const data = useFMStore();

const current = ref('');
const err = ref<'file' | 'img' | 'err'>('file');

const ext = computed(() =>
  props.name?.slice(props.name?.indexOf('.') + 1).toLowerCase()
);

const index = computed(
  () =>
    Object.keys(extensions)
      .map((item) => item.split('|'))
      .map((item, index) => (item.includes(ext.value) ? index : -1))
      .filter((item) => item !== -1)[0]
);

const onErr = () => {
  err.value = 'err';
  current.value = '/img/file-icons/txt.png';
};

const update = () => {
  if (Object.values(extensions)?.[index.value]) {
    err.value = 'file';
    current.value =
      '/img/file-icons/' +
      (Object.values(extensions)?.[index.value] ?? 'txt.png');

    return;
  }

  err.value = 'img';
  current.value = props.link;
};

watch(() => props.link, update);
onBeforeMount(update);

const style = {
  width: '70px',
  height: '70px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

interface ImageImgProps {
  link: string;
  name: string;
}
</script>

<style scoped lang="scss">
.q-img__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
