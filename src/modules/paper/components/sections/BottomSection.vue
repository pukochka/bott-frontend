<template>
  <div class="absolute-bottom q-ma-sm q-mx-240 overflow-hidden row justify-end">
    <q-card bordered flat class="rounded">
      <q-btn flat size="md" color="primary" icon="add" @click="log">
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Добавить вопрос
        </q-tooltip>
      </q-btn>

      <q-btn flat size="md" color="primary" icon="save" @click="add">
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Сохранить расположение вопросов
        </q-tooltip>
      </q-btn>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { usePSStore } from '../../stores/PSstore';

const store = usePSStore();
const add = () => {
  console.log(
    store.feedback.inputs.map((item) => {
      return { x: item.platform?.position.x, y: item.platform?.position.y };
    })
  );
};

const log = () => {
  console.log(store.view.viewSize);
};
</script>

<style scoped lang="scss">
.q-mx-240 {
  margin-left: 240px;
  margin-right: 240px;
}
</style>
