<template>
  <q-inner-loading
    :showing="props.showing"
    class="flex flex-center q-mt-none rounded q-pa-md cursor-pointer"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
      v-if="props.tooltip"
    >
      {{ props.tooltip }}
    </q-tooltip>

    <div>
      <div class="row justify-center">
        <q-icon :name="props.icon" size="32px" color="black" />
      </div>

      <div class="text-h6 text-center q-py-sm white-space--normal text-black">
        {{ props.label }}
      </div>
    </div>
  </q-inner-loading>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<MessageShadowProps>(), {
  showing: false,
  label: '',
  icon: '',
  tooltip: '',
});
interface MessageShadowProps {
  showing: boolean;
  label: string;
  tooltip?: string;
  icon?: string;
}
</script>

<style scoped lang="scss">
.white-space--normal {
  white-space: normal;
}
</style>
