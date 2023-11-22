<template>
  <q-card
    bordered
    flat
    class="row absolute-top q-ma-xs q-mx-xxl rounded overflow-hidden"
  >
    <div class="col">
      <q-btn
        square
        no-caps
        stack
        flat
        class="fit"
        size="md"
        color="primary"
        label="Смотреть ответы"
      />
    </div>
    <div class="col">
      <q-btn
        square
        no-caps
        stack
        flat
        class="fit"
        size="md"
        color="primary"
        label="Настройки уведомлений для администраторов и в чаты/каналы"
      />
    </div>
    <div class="col">
      <q-btn
        square
        no-caps
        stack
        flat
        class="fit"
        size="md"
        color="primary"
        label="Настройки обратной связи"
      />
    </div>

    <div class="absolute-full" v-if="disabled"></div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePSStore } from '../stores/PSstore';

const store = usePSStore();

const disabled = computed(
  () => store.onconnection || store.dragging || store.onmessage
);
</script>

<style scoped lang="scss">
.q-mx-xxl {
  margin-left: 180px;
  margin-right: 180px;
}
</style>
