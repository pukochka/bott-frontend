<template>
  <div class="">
    <div :class="['row ' + rowClasses]">
      <div :class="colClasses" v-for="(button, index) in buttons" :key="index">
        <q-btn
          stack
          outline
          no-caps
          class="rounded fit"
          :class="[buttonClasses]"
          size="md"
          :to="button.link"
          :color="button.color ?? 'primary'"
          :icon="button.icon"
          :label="button.label"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<ViewButtonsProps>(), {
  buttons: () => [],
  colClasses: 'col-12 col-sm-6',
  rowClasses: 'q-col-gutter-sm',
  buttonClasses: '',
});

interface ViewButtonsProps {
  buttons: BOTTViewButtons[];
  colClasses?: string;
  buttonClasses?: string;
  rowClasses?: string;
}
</script>

<style lang="scss" scoped></style>
