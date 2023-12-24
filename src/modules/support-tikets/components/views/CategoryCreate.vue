<template>
  <div class="q-gutter-y-sm q-pa-lg">
    <div class="text-h6 text-center">Добавить категорию</div>

    <div class="row justify-center">
      <div class="col-12 col-sm-4">
        <q-input
          dense
          v-model="text"
          label="Название новой категории"
          outlined
          class="bott-input--rounded"
        />

        <div class="row justify-end q-gutter-x-sm q-pt-sm">
          <q-btn
            flat
            no-caps
            size="md"
            color="red"
            label="Отмена"
            class="rounded"
            @click="work.section = 'select'"
          />

          <q-btn
            unelevated
            no-caps
            size="md"
            color="primary"
            label="Добавить"
            class="rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkStore } from '../../stores/workStore';

const work = useWorkStore();

const text = ref('');
</script>

<style scoped lang="scss"></style>
