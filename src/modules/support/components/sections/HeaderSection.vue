<template>
  <div class="col-12 q-px-md">
    <div class="" v-if="md">
      <div class="row no-wrap q-pb-xs q-col-gutter-x-sm bott-btn__outline">
        <div class="col-11">
          <q-btn
            outline
            no-wrap
            no-caps
            size="md"
            color="primary"
            :label="support.selectedCategory?.title ?? 'Выбрать категорию'"
            class="rounded-top fit"
            @click="support.openDialog('select_category')"
          />
        </div>

        <div class="col">
          <q-btn
            outline
            no-wrap
            no-caps
            size="md"
            color="primary"
            icon="add"
            class="rounded-top fit"
            @click="createCategory"
          />
        </div>
      </div>
    </div>

    <div class="row items-center" v-else>
      <q-separator vertical class="q-my-xs" />

      <q-scroll-area
        visible
        style="height: 32px"
        class="col"
        :thumb-style="thumbStyle"
      >
        <div class="row no-wrap">
          <div
            class="row items-center no-wrap rounded-top overflow-hidden transition"
            v-for="category of support.categories"
            :key="category.id"
            style="max-width: 170px; min-width: 170px"
            :class="[
              support.selectedCategory?.id === category.id
                ? ' bg-primary text-white'
                : '',
            ]"
          >
            <q-btn
              flat
              no-caps
              no-wrap
              square
              class="fit"
              padding="4px 12px"
              @click="support.selectCategory(category)"
            >
              <div class="text-weight-bold ellipsis">{{ category.title }}</div>
            </q-btn>

            <q-separator vertical class="q-my-xs" />
          </div>
        </div>
      </q-scroll-area>

      <q-btn
        flat
        icon="add"
        color="primary"
        padding="4px"
        class="rounded q-ml-sm"
        @click="createCategory"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Добавить категорию
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupportStore } from '../../stores/supportStore';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { fetchSupportTicket } from '../../api/queries';

const support = useSupportStore();
const quasar = useQuasar();

const md = computed(() => quasar.screen.lt.md);

const createCategory = () => {
  support.selectedCategory = null;
  support.section = 'create';
};

const color = [
  '#c1121f',
  '#fca311',
  '#588157',
  '#a98467',
  '#7209b7',
  '#619b8a',
  '#f9844a',
  '#6d597a',
  '#ffc9b9',
  '#4c956c',
  '#4c8fa2',
  '#dff71d',
];

const thumbStyle = {
  height: '4px',
  margin: '2px',
  background: 'var(--q-primary)',
};
</script>

<style scoped lang="scss">
.rounded-top {
  border-radius: 10px 10px 0 0;
}
</style>
