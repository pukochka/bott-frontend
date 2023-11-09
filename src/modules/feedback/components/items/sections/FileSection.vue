<template>
  <div class="row no-wrap rounded-container-grey">
    <div class="q-pa-sm">
      <div class="text-subtitle1">Максимальный размер файла</div>

      <div class="rounded bg-blue-2 q-py-xs q-px-sm">
        {{ size }}
      </div>
    </div>

    <q-space />
  </div>

  <div class="row no-wrap rounded-container-grey">
    <div class="q-pa-sm">
      <div class="text-subtitle1">Разрешенные расширения</div>

      <div class="rounded bg-blue-2 q-py-xs q-px-sm">
        {{ extText }}
      </div>
    </div>

    <q-space />
  </div>
</template>

<script setup lang="ts">
import 'src/utils/polifils/dimension';
import { computed } from 'vue';
import { defaultFileQuestion } from '../../../stores/FBModels';

const props = withDefaults(defineProps<FileSectionProps>(), {
  data: () => defaultFileQuestion,
});

const size = computed(() => props.data?.size?.dimension());

const extText = computed(() =>
  props.data.extensions === ''
    ? 'Разрешены все расширения'
    : props.data.extensions
);

interface FileSectionProps {
  data: FBFileQuestion;
}
</script>

<style lang="scss" scoped></style>
