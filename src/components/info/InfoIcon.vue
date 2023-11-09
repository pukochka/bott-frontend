<template>
  <q-icon v-if="text" :name="text.icon" :color="text.color" size="26px" />

  <div v-else>{{ props.value }}</div>
</template>

<script lang="ts" setup>
import { mdiCheck, mdiClose } from '@quasar/extras/mdi-v7';
import { computed } from 'vue';

const props = withDefaults(defineProps<InfoIconProps>(), {
  value: '',
});

const icon: any = {
  '+': {
    color: 'green',
    icon: mdiCheck,
  },
  '-': {
    color: 'red',
    icon: mdiClose,
  },
};

const text = computed(() => icon[props.value]);

interface InfoIconProps {
  value: string;
}
</script>

<style lang="scss" scoped></style>
