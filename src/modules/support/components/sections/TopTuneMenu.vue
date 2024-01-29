<template>
  <q-btn
    flat
    square
    :padding="padding"
    color="primary"
    :icon="mdiApplicationCog"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Управление категорией
    </q-tooltip>

    <q-menu class="bott-portal-menu">
      <q-list dense style="max-width: 330px">
        <q-item clickable dense @click="changeStatus">
          <q-item-section
            class="text-center text-positive"
            v-if="support.selectedCategory?.status === 1"
          >
            Категория активна
          </q-item-section>

          <q-item-section class="text-center text-negative" v-else>
            Категория отключена
          </q-item-section>

          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Нажмите для изменения статуса
          </q-tooltip>
        </q-item>

        <q-item clickable dense>
          <q-item-section avatar>
            <q-icon :name="mdiViewAgenda" color="primary" size="26px" />
          </q-item-section>

          <q-item-section>Вид</q-item-section>

          <q-menu class="bott-portal-menu">
            <q-list dense>
              <q-item clickable @click="support.view = 'table'">
                <q-item-section>Таблица</q-item-section>

                <q-item-section avatar v-if="support.view === 'table'">
                  <q-icon name="check" color="primary" size="26px" />
                </q-item-section>
              </q-item>

              <q-item clickable @click="support.view = 'grid'">
                <q-item-section>Плитка</q-item-section>

                <q-item-section avatar v-if="support.view === 'grid'">
                  <q-icon name="check" color="primary" size="26px" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>

        <q-item
          clickable
          dense
          v-for="(button, index) of topActions"
          :key="index"
          v-show="button.condition"
          @click="button.action"
        >
          <q-item-section avatar>
            <q-icon :name="button.icon" :color="button.color" size="26px" />
          </q-item-section>

          <q-item-section>{{ button.label }}</q-item-section>
        </q-item>

        <q-inner-loading :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { useDialog } from '../../../file-manager/stores/useDialog';
import { fetchSupportCategory, fetchSupportTicket } from '../../api/queries';

import {
  mdiBriefcaseArrowUpDown,
  mdiTagCheck,
  mdiViewAgenda,
  mdiApplicationCog,
} from '@quasar/extras/mdi-v7';
import { useQuasar } from 'quasar';

const support = useSupportStore();
const quasar = useQuasar();

const loading = ref(false);

const sm = computed(() => quasar.screen.lt.sm);
const padding = computed(() => (sm.value ? '4px 16px' : '6px 32px'));

const deleteCategory = () => {
  if (support.selectedCategory?.default === 1) return;

  useDialog(
    `Вы уверены, что хотите удалить категорию <span class="text-primary">
${support.selectedCategory?.title ?? ''}
</span>?`,
    true
  ).onOk(() => {
    loading.value = true;

    fetchSupportCategory(
      'delete',
      {
        category_id: support.selectedCategory?.id ?? -1,
      },
      (response) => {
        support.section = 'select';
        support.selectedCategory = null;
        support.tickets = [];
        support.categories = response;
      }
    ).then(() => (loading.value = false));
  });
};

const massOffer = () => {
  useDialog(
    'Вы уверены, что хотите предложить закрыть все октрытые тикеты ' +
      `<span class='text-primary'>${
        support.selectedCategory?.title ?? ''
      }</span>?`,
    true
  ).onOk(() => {
    loading.value = true;

    fetchSupportTicket('mass-offer', {
      implementer_id: config.user_id,
      category_id: support.selectedCategory?.id ?? -1,
    }).then(() => {
      loading.value = false;
    });
  });
};

const changeStatus = () => {
  loading.value = true;
  fetchSupportCategory(
    'change-status',
    {
      category_id: support.selectedCategory?.id ?? -1,
    },
    () => {
      if (support.selectedCategory) {
        loading.value = false;
        const status = support.selectedCategory.status;
        support.selectedCategory.status = status === 1 ? 0 : 1;
      }
    }
  );
};

const topActions = computed(() => [
  {
    label: 'Перенос незакрытых тикетов на другого исполнителя',
    action: () => support.openDialog('select_implementer'),
    color: 'info',
    icon: mdiBriefcaseArrowUpDown,
    condition: true,
  },
  {
    label: 'Предложить закрыть все открытые тикеты',
    action: massOffer,
    color: 'warning',
    icon: mdiTagCheck,
    condition: true,
  },
  {
    label: 'Удалить категорию',
    action: deleteCategory,
    color: 'red',
    icon: 'close',
    condition: support.selectedCategory?.default === 0,
  },
]);
</script>

<style scoped lang="scss"></style>
