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

      <!--        <q-menu class="bott-portal-menu" anchor="bottom right" self="top end">-->
      <!--          <q-list dense style="max-width: 250px">-->
      <!--            <q-item-->
      <!--              clickable-->
      <!--              v-close-popup-->
      <!--              v-for="(button, index) of categoryButtons"-->
      <!--              :key="index"-->
      <!--              @click="button.action"-->
      <!--            >-->
      <!--              <q-item-section avatar>-->
      <!--                <q-icon :name="button.icon" :color="button.color" size="22px" />-->
      <!--              </q-item-section>-->

      <!--              <q-item-section>{{ button.label }}</q-item-section>-->
      <!--            </q-item>-->
      <!--          </q-list>-->
      <!--        </q-menu>-->

      <q-btn
        no-caps
        unelevated
        class="rounded absolute-center"
        padding="0 8px"
        size="13px"
        color="positive"
        label="Активна"
      >
        <q-menu
          anchor="bottom middle"
          self="top middle"
          class="bott-portal-menu"
        >
          <q-list dense>
            <q-item clickable class="text-red" v-if="work.selectedCategory">
              <q-item-section>Отключить</q-item-section>
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
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>

        <q-btn
          dense
          square
          flat
          color="primary"
          icon="close"
          @click="closeSection"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Закрыть
          </q-tooltip>
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

const work = useWorkStore();

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

const topActions = computed(() => [
  {
    label: 'Фильтр',
    icon: mdiFilter,
    action: '',
    menu: [],
  },
  {
    label: 'Выбор',
    icon: mdiViewAgenda,
    action: '',
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
