<template>
  <q-img
    src="/src/assets/files-icon/xlsx.png"
    spinner-color="primary"
    spinner-size="82px"
    fit="contain"
    :style="{ height: size + 'px', width: size + 'px' }"
  />
</template>

<script setup lang="ts">
import { BOTTIcons, icons } from 'src/assets/icons';
import { computed } from 'vue';

const props = withDefaults(defineProps<BottIconProps>(), {
  name: 'pdf',
  size: 40,
});

const icon = computed(() => icons[props.name]);

interface BottIconProps {
  name: BOTTIcons;
  size?: number;
}
</script>

<style scoped lang="scss"></style>
