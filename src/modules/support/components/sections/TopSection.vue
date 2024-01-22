<template>
  <div class="q-mx-md" v-if="!['create', 'select'].includes(support.section)">
    <div class="">
      <div class="row justify-center q-gutter-xs">
        <q-btn
          dense
          no-caps
          square
          :flat="sm"
          :unelevated="!sm"
          :icon="button.icon"
          :color="button.color"
          :class="sm ? ' col-12' : ' rounded-bottom'"
          :padding="sm ? '' : '2px 32px'"
          v-show="button.condition"
          :loading="button.loading"
          @click="button.action"
          v-for="(button, index) of categoryButtons"
          :key="index"
        >
          <div class="">{{ sm ? button.label : '' }}</div>

          <q-tooltip
            v-if="!sm"
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="row justify-between items-center relative-position">
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
              v-if="support.selectedCategory?.status === 1"
              @click="changeStatus(0)"
            >
              <q-item-section>Отключить</q-item-section>
            </q-item>

            <q-item
              clickable
              class="text-positive"
              v-else
              @click="changeStatus(1)"
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
          v-for="(button, index) of topActions"
          :key="index"
          :icon="button.icon"
          :loading="button.loading"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            {{ button.label }}
          </q-tooltip>

          <q-menu class="bott-portal-menu" v-if="button.menu.length">
            <q-list dense style="max-width: 300px">
              <q-item
                clickable
                v-close-popup
                v-for="(item, index) of button.menu"
                :key="index"
                @click="item.action"
              >
                <q-item-section avatar v-if="item?.icon">
                  <q-icon :name="item.icon" :color="item.color" size="26px" />
                </q-item-section>

                <q-item-section>{{ item.label }}</q-item-section>

                <q-item-section avatar v-if="item?.condition">
                  <q-icon name="check" color="primary" size="26px" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <q-btn
        flat
        dense
        color="primary"
        icon="close"
        @click="support.closeSection"
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
</template>

<script setup lang="ts">
import { config } from '../../config';
import { computed, ref } from 'vue';

import { categoryStatues } from '../../utils/statuses';
import { fetchSupportCategory, fetchSupportTicket } from '../../api/queries';

import { useDialog } from '../../../file-manager/stores/useDialog';
import { useSupportStore } from '../../stores/supportStore';
import { useQuasar } from 'quasar';

import {
  mdiAccountTie,
  mdiEyeOutline,
  mdiBriefcaseArrowUpDown,
  mdiStickerOutline,
  mdiViewAgenda,
  mdiViewDashboardEdit,
  mdiTagCheck,
} from '@quasar/extras/mdi-v7';

const support = useSupportStore();
const quasar = useQuasar();

const loading = ref({
  delete: false,
  mass: false,
});

const status = computed(
  () => categoryStatues[support.selectedCategory?.status ?? 0]
);

const sm = computed(() => quasar.screen.lt.sm);

const deleteCategory = () => {
  useDialog(
    `Вы уверены, что хотите удалить категорию <span class="text-primary">${
      support.selectedCategory?.title ?? ''
    }</span>?`,
    true
  ).onOk(() => {
    loading.value.delete = true;

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
    ).then(() => (loading.value.delete = false));
  });
};

const changeStatus = (status: number) => {
  fetchSupportCategory(
    'change-status',
    {
      category_id: support.selectedCategory?.id ?? -1,
    },
    () => {
      if (support.selectedCategory) {
        support.selectedCategory.status = status;
      }
    }
  ).then(() => {
    console.log();
  });
};

const massOffer = () => {
  useDialog(
    'Вы уверены, что хотите предложить закрыть все октрытые тикеты категории ' +
      `<span class='text-primary'>${
        support.selectedCategory?.title ?? ''
      }</span>?`,
    true
  ).onOk(() => {
    loading.value.mass = true;

    fetchSupportTicket('mass-offer', {
      implementer_id: config.user_id,
      category_id: support.selectedCategory?.id ?? -1,
    }).then(() => {
      loading.value.mass = false;
    });
  });
};

const topActions = computed(() => [
  {
    label: 'Массовые действия',
    icon: mdiViewDashboardEdit,
    loading: loading.value.mass,
    menu: [
      {
        label: 'Перенос незакрытых тикетов на другого исполнителя',
        action: () => support.openDialog('select_implementer'),
        condition: false,
        color: 'info',
        icon: mdiBriefcaseArrowUpDown,
      },
      {
        label: 'Предложить закрыть все открытые тикеты данной категории',
        action: massOffer,
        condition: false,
        color: 'warning',
        icon: mdiTagCheck,
      },
    ],
  },
  {
    label: 'Вид',
    icon: mdiViewAgenda,
    loading: false,
    menu: [
      {
        label: 'Таблица',
        action: () => (support.view = 'table'),
        condition: support.view === 'table',
        color: '',
        icon: undefined,
      },
      {
        label: 'Плитка',
        action: () => (support.view = 'grid'),
        condition: support.view === 'grid',
        color: '',
        icon: undefined,
      },
    ],
  },
]);

const categoryButtons = computed(() => [
  {
    label: 'Просмотр тикетов',
    icon: mdiStickerOutline,
    action: () => (support.section = 'list'),
    color: 'primary',
    condition: support.selectedCategory !== null && support.section !== 'list',
    loading: false,
  },
  {
    label: 'Просмотр исполнителей категории',
    icon: mdiAccountTie,
    action: () => (support.section = 'manager'),
    color: 'grey',
    condition: true,
    loading: false,
  },
  {
    label: 'Просмотр лога категории',
    icon: mdiEyeOutline,
    action: () => (support.section = 'log'),
    color: 'orange',
    condition: true,
    loading: false,
  },
  {
    label: 'Редактирование категории',
    icon: 'edit',
    action: () => (support.section = 'edit'),
    color: 'info',
    condition: true,
    loading: false,
  },
  {
    label: 'Удалить категорию',
    icon: 'close',
    action: deleteCategory,
    color: 'red',
    condition: true,
    loading: loading.value.delete,
  },
]);
</script>

<style scoped lang="scss">
.rounded-bottom {
  border-radius: 0 0 10px 10px;
}
</style>
