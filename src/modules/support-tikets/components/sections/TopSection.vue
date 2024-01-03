<template>
  <div class="" v-if="!['create', 'select'].includes(work.section)">
    <div class="row justify-between items-center q-px-md relative-position">
      <div class="row">
        <q-btn
          dense
          no-caps
          square
          flat
          :icon="button.icon"
          :color="button.color"
          v-for="(button, index) of categoryButtons"
          :key="index"
          @click="button.action"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>

      <q-btn
        no-caps
        unelevated
        class="rounded absolute-center"
        padding="0 8px"
        size="13px"
        :color="status.color"
        :label="status.label"
      >
        <q-menu
          anchor="bottom middle"
          self="top middle"
          class="bott-portal-menu"
        >
          <q-list dense>
            <q-item
              clickable
              class="text-red"
              v-if="work.selectedCategory?.status === 1"
              @click="disableCategory"
            >
              <q-item-section>Отключить</q-item-section>
            </q-item>

            <q-item
              clickable
              class="text-positive"
              v-else
              @click="activateCategory"
            >
              <q-item-section>Включить</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div class="row">
        <q-btn
          dense
          square
          flat
          color="primary"
          :icon="button.icon"
          v-for="(button, index) of topActions"
          :key="index"
          @click="button.action"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>

          <q-menu class="bott-portal-menu" v-if="button.menu.length">
            <q-list dense>
              <q-item
                clickable
                v-for="(item, index) of button.menu"
                :key="index"
                @click="item.action"
              >
                <q-item-section>{{ item.label }}</q-item-section>

                <q-item-section avatar v-if="item.condition">
                  <q-icon name="check" color="primary" size="26px" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <q-separator inset />
  </div>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import {
  mdiAccountTie,
  mdiEyeOutline,
  mdiFilter,
  mdiViewAgenda,
} from '@quasar/extras/mdi-v7';
import { computed } from 'vue';
import { useDialog } from '../../../file-manager/stores/useDialog';
import { categoryStatues } from '../../utils/statuses';

const work = useWorkStore();

const status = computed(
  () => categoryStatues[work.selectedCategory?.status ?? 0]
);

const closeSection = () => {
  if (['log', 'manager', 'edit'].includes(work.section)) {
    work.section = 'list';
    return;
  }

  if (work.selectedCategory?.id) work.selectedCategory = null;

  work.section = 'select';
};

const deleteCategory = () => {
  useDialog(
    `Вы уверены, что хотите удалить категорию <span class="text-primary">${
      work.selectedCategory?.label ?? ''
    }</span>?`,
    true
  );
};

const activateCategory = () => {
  console.log(1);
};

const disableCategory = () => {
  console.log(1);
};

const topActions = computed(() => [
  {
    label: 'Фильтр',
    icon: mdiFilter,
    action: '',
    menu: [],
  },
  {
    label: 'Просмотр',
    icon: mdiViewAgenda,
    action: '',
    menu: [
      {
        label: 'Режим таблицы',
        action: () => (work.view = 'table'),
        condition: work.view === 'table',
      },
      {
        label: 'Режим плитки',
        action: () => (work.view = 'grid'),
        condition: work.view === 'grid',
      },
    ],
  },
  {
    label: 'Зактрыть',
    icon: 'close',
    action: closeSection,
    menu: [],
  },
]);

const categoryButtons = computed(() => [
  {
    label: 'Просмотр менеджеров категории',
    icon: mdiAccountTie,
    action: () => (work.section = 'manager'),
    color: 'grey',
    condition: '',
  },
  {
    label: 'Просмотр лога категории',
    icon: mdiEyeOutline,
    action: () => (work.section = 'log'),
    color: 'orange',
    condition: '',
  },
  {
    label: 'Редактирование категории',
    icon: 'edit',
    action: () => (work.section = 'edit'),
    color: 'primary',
    condition: '',
  },
  {
    label: 'Удалить категорию',
    icon: 'close',
    action: deleteCategory,
    color: 'red',
    condition: '',
  },
]);
</script>

<style scoped lang="scss"></style>
