<template>
  <svg class="connections-container fit">
    <g
      class="gpath"
      v-for="line of vector.linesValue"
      :key="line.button_id"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @mouseout="hideTooltip"
      @click="openMenu(line.button_id)"
    >
      <path
        class="line"
        stroke-width="1.6"
        :d="line.line?.path"
        fill="transparent"
      />

      <polygon class="arrow" :points="line.line?.polygon" stroke-width="1" />
    </g>

    <g class="gpath" v-for="line of vector.combineLines" :key="line.id">
      <path
        class="timer-line"
        stroke-width="1.6"
        :d="line.path"
        fill="transparent"
      />

      <polygon class="timer-arrow" :points="line.polygon" stroke-width="1" />
    </g>
  </svg>

  <q-menu
    v-model="menu"
    touch-position
    @before-show="showUpdate"
    @before-hide="hideUpdate"
    class="bott-portal-menu"
  >
    <button-menu
      @close="menu = false"
      :button="data.selectedButton"
      :message="data.selectedMessage"
    ></button-menu>
  </q-menu>

  <transition name="q-transition--fade">
    <q-card
      flat
      v-if="tooltip.state"
      class="absolute rounded z-max q-tooltip--style"
      :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
    >
      Нажмите, чтобы изменить
    </q-card>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVectorStore } from '../../stores/vector/vectorStore';
import { useDataStore } from '../../stores/data/dataStore';
import { useStatesStore } from '../../stores/states/statesStore';

import ButtonMenu from '../items/sections/ButtonMenu.vue';

const vector = useVectorStore();
const data = useDataStore();
const states = useStatesStore();

const menu = ref(false);
const click = ref(false);
const tooltip = ref({
  x: 0,
  y: 0,
  state: false,
  handle: false,
});

const lines = computed(() => vector.lines ?? []);
const combined = computed(() => vector.combineLines);

const openMenu = (button_id: number) => {
  if (menu.value || states.dragValue.el) return;

  const messages =
    data.scenarioValue?.columns.map((column) => column.messages).flat() ?? [];

  for (const message of messages) {
    const isInclude = (message.menu?.lines ?? [])
      .map((line) => line.buttons ?? [])
      .flat()
      .map((button) => button.id)
      .includes(button_id);

    if (isInclude) data.selectedMessage = message;
  }

  data.selectedButton =
    data.scenarioValue?.columns
      .map((column) => column.messages)
      .flat()
      .map((message) => message.menu?.lines ?? [])
      .flat()
      .map((line) => line.buttons ?? [])
      .flat()
      .find((button) => button.id === button_id) ?? null;

  if (!data.selectedButton || !data.selectedMessage) return;

  click.value = true;
};

const showUpdate = () => {
  if (!click.value) menu.value = false;
};

const hideUpdate = () => {
  click.value = false;
};

const showTooltip = async (e: MouseEvent) => {
  if (vector.mountedLine) return;

  const { clientY, clientX } = e;

  tooltip.value.x = clientX - 80;
  tooltip.value.y = clientY - 40 - 100;

  tooltip.value.handle = true;

  await new Promise((res) => setTimeout(() => res(1), 300)).then(() => {
    if (tooltip.value.handle) tooltip.value.state = true;
  });
};

const hideTooltip = () => {
  tooltip.value.handle = false;
  tooltip.value.state = false;
};
</script>

<style lang="scss" scoped>
.q-tooltip--style {
  padding: 6px 10px;
  background: #757575;
}
</style>
