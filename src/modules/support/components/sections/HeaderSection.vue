<template>
  <div class="row no-wrap overflow-hidden rounded-top">
    <q-btn
      flat
      size="md"
      color="primary"
      :icon="mdiMenu"
      padding="8px 32px"
      :disable="support.selectedCategory === null"
    >
      <q-menu class="bott-portal-menu" max-width="250px">
        <q-list dense separator>
          <q-item
            clickable
            v-for="(button, index) in buttons"
            :key="index"
            v-show="button.condition"
            @click="button.action"
          >
            <q-item-section avatar>
              <q-icon :name="button.icon" :color="button.color" size="22px" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ button.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-inner-loading :showing="loading">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn
      flat
      square
      size="16px"
      color="primary"
      icon="chevron_left"
      padding="8px 32px"
      @click="support.closeChat"
      v-if="sm && support.selectedTicket"
    >
    </q-btn>

    <q-tabs
      dense
      shrink
      class="non-selectable"
      active-color="primary"
      v-model="support.category"
    >
      <q-tab
        no-caps
        v-for="category in support.categories"
        :key="category.id"
        :name="category.id"
        @click="support.selectCategory(category)"
      >
        <div>{{ category.title }}</div>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, ref } from 'vue';

import { useDialog } from 'src/utils/use/useDialog';
import { fetchSupportCategory, fetchSupportTicket } from '../../api/queries';
import { useSupportStore } from '../../stores/supportStore';
import { useQuasar } from 'quasar';

import {
  mdiAccountTie,
  mdiBriefcaseArrowUpDown,
  mdiEyeOutline,
  mdiMenu,
  mdiTagCheck,
} from '@quasar/extras/mdi-v7';

const support = useSupportStore();
const quasar = useQuasar();

const loading = ref(false);

const sm = computed(() => quasar.screen.lt.sm);

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

const buttons = computed(() => [
  {
    label: 'Добавить категорию',
    icon: 'add',
    action: () => support.openDialog('category_add'),
    color: 'primary',
    condition: true,
  },
  {
    label: 'Исполнители категории',
    icon: mdiAccountTie,
    action: () => support.openDialog('category_implementers'),
    color: 'accent',
    condition: true,
  },
  {
    label: 'Лог категории',
    icon: mdiEyeOutline,
    action: () => support.openDialog('category_log'),
    color: 'orange',
    condition: true,
  },
  {
    label: 'Редактирование категории',
    icon: 'edit',
    action: () => support.openDialog('category_edit'),
    color: 'secondary',
    condition: true,
  },
  {
    label: 'Изменить статус категории',
    icon: 'circle',
    action: changeStatus,
    color: support.selectedCategory?.status === 1 ? 'positive' : 'negative',
    condition: true,
  },
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

<style scoped lang="scss">
.rounded-top {
  border-radius: 10px 10px 0 0;
}
</style>
