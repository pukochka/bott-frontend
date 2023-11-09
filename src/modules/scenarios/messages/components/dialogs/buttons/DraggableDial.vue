<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="states.dialogs.draggable"
  >
    <q-card style="width: 100%" flat bordered class="dialog-rounded">
      <dialog-header label="Перемещение кнопок"></dialog-header>

      <q-card-section class="q-pt-none">
        <div id="DraggableArea" @touchmove="DragAreaHandler">
          <div v-for="(line, index) of elements" :key="index">
            <VueDraggableNext
              v-model="line.buttons"
              class="flex q-gutter-md q-py-sm no-wrap"
              itemKey="id"
              v-bind="dragOptions"
              @start="dragStart"
              @end="dragEnd"
              @change="dragChange"
              @dragenter="updateLine(line)"
              @touchmove="updateLine(line)"
              @dragover="DragAreaHandler"
            >
              <div
                class="col text-center q-pa-md rounded cursor-move ellipsis"
                v-for="(element, index) in line.buttons"
                :key="index"
              >
                <div class="ellipsis">{{ element.text }}</div>

                <q-tooltip
                  v-if="!is_drag"
                  class="bott-tooltip text-center"
                  anchor="top middle"
                  self="bottom middle"
                >
                  Зажмите для перемещения
                </q-tooltip>
              </div>
            </VueDraggableNext>
          </div>
        </div>
      </q-card-section>

      <div class="row q-px-md q-pb-md justify-between items-center">
        <div class="row items-center text-subtitle2">
          <div class="row items-center q-gutter-x-sm" v-if="loading">
            <div class="text-warning q-pa-sm">Производятся изменения!</div>

            <q-spinner color="warning" size="2em" />
          </div>
          <div class="text-green q-pa-sm" v-else>
            Все изменения синхронизированы!
          </div>
        </div>

        <q-btn
          dense
          class="q-px-md"
          rounded
          flat
          size="md"
          label="Закрыть"
          color="primary"
          v-close-popup
        />
      </div>

      <q-slide-transition :duration="100" class="absolute-top">
        <div v-show="helpClassTop">
          <div
            class="bg-primary q-pa-md text-center text-white rounded-borders"
          >
            Отпустите, для перемещения, в верхнюю линию!
          </div>
        </div>
      </q-slide-transition>
      <q-slide-transition :duration="100" class="absolute-bottom">
        <div v-show="helpClassBottom">
          <div
            class="bg-primary q-pa-md text-center text-white rounded-borders"
          >
            Отпустите, для перемещения, в нижниюю линию!
          </div>
        </div>
      </q-slide-transition>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import { useStatesStore } from '../../../stores/states/statesStore';
import { useDataStore } from '../../../stores/data/dataStore';

import { fetchButtons } from '../../../api';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const states = useStatesStore();
const data = useDataStore();

const is_drag = ref(false);
const loading = ref(false);
const selected_line = ref<IMLine | null>(null);
const moving_element = ref<IMButton | null>(null);

const helpClassTop = ref(false);
const helpClassBottom = ref(false);

const elements = computed(() => data.selectedMessage?.inline_menu?.lines ?? []);


const dragStart = (e: CustomEvent) => {
  moving_element.value = e.item._underlying_vm_;
  is_drag.value = true;
};

const dragEnd = () => {
  if (helpClassTop.value) {
    loading.value = true;
    fetchButtons('move-first-line', {
      id: moving_element.value?.id ?? 0,
    }).then(() => (loading.value = false));
  }

  if (helpClassBottom.value) {
    loading.value = true;
    fetchButtons('move-last-line', {
      id: moving_element.value?.id ?? 0,
    }).then(() => (loading.value = false));
  }
  is_drag.value = false;
  helpClassTop.value = false;
  helpClassBottom.value = false;
};

const updateLine = (line: IMLine) => (selected_line.value = line);

const dragChange = (evt: DragEvent) => {
  if ('moved' in evt) {
    loading.value = true;
    fetchButtons('change-sort-and-line', {
      line_id: selected_line.value?.id ?? 0,
      id: evt.moved?.element.id ?? 0,
      sort: evt.moved?.newIndex ?? 0,
    }).then(() => (loading.value = false));
  }
  if ('added' in evt) {
    loading.value = true;
    fetchButtons('change-sort-and-line', {
      line_id: selected_line.value?.id ?? 0,
      id: evt.added?.element.id ?? 0,
      sort: evt.added?.newIndex ?? 0,
    }).then(() => (loading.value = false));
  }
};

const DragAreaHandler = (evt: MouseEvent | TouchEvent) => {
  const container = document!
    .getElementById('DraggableArea')!
    .getBoundingClientRect();

  const event_y =
    'clientY' in evt ? evt.clientY : evt.changedTouches[0].clientY;

  if (selected_line.value?.buttons.length === 1) return;

  if (event_y < container.top + 22) {
    helpClassTop.value = true;
  } else if (event_y > container.bottom - 4) {
    helpClassBottom.value = true;
  } else {
    helpClassTop.value = false;
    helpClassBottom.value = false;
  }
};

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    ghostClass: 'ghost-item',
  };
});

interface DragEvent {
  moved?: {
    newIndex: number;
    element: IMButton;
  };
  added?: {
    newIndex: number;
    element: IMButton;
  };
}

interface CustomEvent {
  item: {
    _underlying_vm_: IMButton;
  };
}
</script>
<style lang="scss" scoped>
.ghost-item {
  background: #1976d2 !important;
  color: #1976d2;
}
</style>
