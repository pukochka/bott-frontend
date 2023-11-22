<template>
  <q-item
    clickable
    class="items-center justify-between no-focus-item"
    :class="{ reverse: targetReverse }"
    @click="select"
  >
    <div class="">
      <q-icon
        name="warning"
        color="orange"
        size="26px"
        v-if="button.type === 6"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          {{ t('notify-add-active-button') }}
        </q-tooltip>
      </q-icon>
    </div>

    <div class="absolute-center ellipsis" style="max-width: 40%">
      <q-item-label class="q-pa-none ellipsis" header>
        {{ button.text }}
      </q-item-label>
    </div>

    <button-checkbox :button="button"></button-checkbox>

    <q-menu
      anchor="bottom right"
      self="top right"
      class="rounded bott-portal-menu"
      v-model="menu_state"
    >
      <button-menu-list
        :message="props.message"
        :button="props.button"
      ></button-menu-list>
    </q-menu>
  </q-item>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from 'src/boot/lang';

import { useVectorStore } from '../../stores/vector/vectorStore';
import { useDataStore } from '../../stores/data/dataStore';

import { defaultButton, defaultMessage } from '../../stores/deafults';

import ButtonCheckbox from './sections/ButtonCheckbox.vue';
import ButtonMenuList from './sections/ButtonMenuList.vue';

const props = withDefaults(defineProps<ButtonItemProps>(), {
  button: () => defaultButton,
  message: () => defaultMessage,
});

const vector = useVectorStore();
const data = useDataStore();

const menu_state = ref(false);

const targetReverse = computed(
  () =>
    vector.lines.find((item) => item.button_id === props.button.id)?.line
      ?.reverse ?? false
);

const select = () => {
  data.selectedButton = props.button;
  data.selectedMessage = props.message;
};

interface ButtonItemProps {
  message: MessageFree;
  button: IMButton;
}
</script>
<style lang="scss">
.drag-active {
  z-index: 100;
}
.no-focus-item .q-focus-helper {
  display: none;
}
</style>
