<template>
  <div class="">{{ props.row.amount }}</div>
</template>

<script lang="ts" setup>
const vmProps = withDefaults(defineProps<SectionProps>(), {
  props: {},
});

interface SectionProps {
  props: any;
}
</script>

<style lang="scss" scoped></style>
