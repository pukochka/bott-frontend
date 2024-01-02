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
  route: '',
});

// TODO Костыль
const info = computed(() =>
  (props.buttons ?? []).map((item) => {
    let link = item.link;
    let label = item.label;

    if (
      (props.route ?? '').includes('system/free?id=') &&
      item.type === 'scenario'
    ) {
      const index = props.route.indexOf('=') + 1;
      link += `&route_id=${props.route.slice(index)}`;
      label = 'Управление сценарием';
    }

    return {
      label: label,
      link: link,
    };
  })
);

interface InfoTypeProps {
  label: string;
  route: string;
  buttons: Array<{ label: string; link: string; type: string }>;
}
</script>

<style lang="scss" scoped></style>
