<template>
  <q-dialog
    v-model="inline.dialogs.drag"
    position="bottom"
    persistent
    full-width
  >
    <q-card
      style="width: 100%; overflow-x: hidden"
      class="relative-position dialog-rounded"
      flat
      bordered
    >
      <q-toolbar class="q-px-md">
        <q-toolbar-title>Перемещение кнопок</q-toolbar-title>

        <q-btn
          flat
          round
          size="md"
          color="primary"
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <div id="DraggableArea" @touchmove="DragAreaHandler">
          <div class="" v-for="(line, index) of props.elements" :key="index">
            <draggable
              class="flex q-gutter-md q-py-sm no-wrap"
              itemKey="id"
              v-bind="dragOptions"
              v-model="line.buttons"
              @start="dragStart"
              @end="dragEnd"
              @change="dragChange"
              @dragenter="updateLine(line)"
              @touchmove="updateLine(line)"
              @dragover="DragAreaHandler"
            >
              <div
                class="col text-center q-pa-md outline rounded cursor-move ellipsis"
                v-for="(el, index) of line.buttons"
                :key="index"
              >
                <div class="ellipsis">{{ el.text }}</div>

                <q-tooltip
                  v-if="!is_drag"
                  transition-hide="fade"
                  transition-show="fade"
                  anchor="top middle"
                  self="bottom middle"
                  class="rounded bg-grey-9"
                >
                  Зажмите для перемещения
                </q-tooltip>
              </div>
            </draggable>
          </div>
        </div>
      </q-card-section>

      <div class="row q-px-md q-pb-md justify-between items-center">
        <div class="row items-center text-subtitle2">
          <div class="row items-center q-gutter-sm" v-if="loading">
            <q-item-label header class="text-warning q-pa-sm">
              Производятся изменения!
            </q-item-label>

            <q-spinner color="warning" size="2em" />
          </div>

          <q-item-label header class="text-green q-pa-sm" v-else>
            Все изменения синхронизированы!
          </q-item-label>
        </div>

        <q-btn
          flat
          no-caps
          class="rounded"
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
import { VueDraggableNext as Draggable } from 'vue-draggable-next';

import { fetchMenu } from '../../api/queries';

import { useInlineStore } from '../../stores/inlineStore';

const props = withDefaults(defineProps<DraggableDialogProps>(), {
  elements: () => [],
});

const is_drag = ref(false);
const loading = ref(false);
const selected_line = ref<IMLine | null>(null);
const moving_element = ref<IMButton | null>(null);

const helpClassTop = ref(false);
const helpClassBottom = ref(false);

const inline = useInlineStore();

const myArray = ref([
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
]);
const dragStart = (e: CustomEvent) => {
  moving_element.value = e.item._underlying_vm_;
  is_drag.value = true;
};

const dragEnd = () => {
  if (helpClassTop.value) {
    loading.value = true;
    fetchMenu(
      'move-first-line',
      {
        id: moving_element.value?.id ?? 0,
      },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => (loading.value = false));
  }

  if (helpClassBottom.value) {
    loading.value = true;
    fetchMenu(
      'move-last-line',
      {
        id: moving_element.value?.id ?? 0,
      },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => (loading.value = false));
  }
  is_drag.value = false;
  helpClassTop.value = false;
  helpClassBottom.value = false;
};

const dragChange = (evt: DragEvent) => {
  if ('moved' in evt) {
    loading.value = true;
    fetchMenu(
      'change-sort-and-line',
      {
        line_id: selected_line.value?.id ?? 0,
        id: evt.moved?.element?.id ?? 0,
        sort: evt.moved?.newIndex ?? 0,
      },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => (loading.value = false));
  }
  if ('added' in evt) {
    loading.value = true;
    fetchMenu(
      'change-sort-and-line',
      {
        line_id: selected_line.value?.id ?? 0,
        id: evt.added?.element.id ?? 0,
        sort: evt.added?.newIndex ?? 0,
      },
      (response) => {
        inline.message.menu = response;
      }
    ).then(() => (loading.value = false));
  }
};

const updateLine = (line: IMLine) => (selected_line.value = line);

const DragAreaHandler = (evt: MouseEvent | TouchEvent) => {
  const container = document
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

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    ghostClass: 'ghost-item',
  };
});

interface DraggableDialogProps {
  elements: IMLine[];
}
</script>
<style lang="scss" scoped>
.ghost-item {
  background: #1976d2 !important;
  color: #1976d2;
}
</style>
