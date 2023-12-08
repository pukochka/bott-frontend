<template>
  <q-btn
    dense
    flat
    padding="0"
    class="rounded"
    :color="linesConnection ? 'warning' : 'primary'"
    :icon="notConnection ? 'radio_button_unchecked' : 'radio_button_checked'"
    :id="`button_${button.id}`">
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle">
      {{ tooltip }}
    </q-tooltip>
  </q-btn>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { defaultButton } from '../../../stores/defaults';

const props = withDefaults(defineProps<ButtonCheckboxProps>(), {
  button: () => defaultButton,
});

const notConnection = computed(() => props.button.type === 6);
const linesConnection = computed(() => props.button.type === 5);

const tooltip = computed(() =>
  notConnection.value
    ? 'Неактивная кнопка'
    : linesConnection.value
    ? 'Нажмите, чтобы изменить связь'
    : 'Нажмите, чтобы изменить путь'
);

interface ButtonCheckboxProps {
  button: IMButton;
}
</script>

<style lang="scss"></style>
