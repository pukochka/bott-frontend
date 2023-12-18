<template>
  <div class="text-center q-py-md">{{ label }}</div>

  <div class="row q-col-gutter-y-xs" v-if="info.length">
    <div class="col-12" v-for="(button, index) of info" :key="index">
      <q-btn
        flat
        no-caps
        padding="4px"
        color="primary"
        class="rounded fit"
        :label="button.label"
        :href="button.link"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<InfoTypeProps>(), {
  label: '',
  buttons: () => [],
});

const info = computed(() => props.buttons ?? []);

interface InfoTypeProps {
  label: string;
  buttons: Array<{ label: string; link: string }>;
}
</script>

<style lang="scss" scoped></style>
