<template>
  <q-card
    flat
    bordered
    class="q-mx-md rounded"
    v-if="!['create', 'select'].includes(work.section)"
  >
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
              v-if="work.selectedCategory?.status === 1"
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

      <q-btn flat dense color="primary" icon="close" @click="closeSection">
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Закрыть
        </q-tooltip>
      </q-btn>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useWorkStore } from '../../stores/workStore';
import {
  mdiAccountTie,
  mdiEyeOutline,
  mdiFilter,
  mdiStickerOutline,
  mdiViewAgenda,
} from '@quasar/extras/mdi-v7';
import { computed, ref } from 'vue';
import { useDialog } from '../../../file-manager/stores/useDialog';
import { categoryStatues } from '../../utils/statuses';
import { useQuasar } from 'quasar';
import { fetchSupportCategory } from '../../api/queries';

const work = useWorkStore();
const quasar = useQuasar();

const loading = ref({
  delete: false,
});

const status = computed(
  () => categoryStatues[work.selectedCategory?.status ?? 0]
);

const sm = computed(() => quasar.screen.lt.sm);
const md = computed(() => quasar.screen.lt.md);

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
      work.selectedCategory?.title ?? ''
    }</span>?`,
    true
  ).onOk(() => {
    loading.value.delete = true;

    fetchSupportCategory(
      'delete',
      {
        category_id: work.selectedCategory?.id ?? -1,
      },
      (response) => {
        work.section = 'select';
        work.selectedCategory = null;
        work.tickets = [];
        work.categories = response;
      }
    ).then(() => (loading.value.delete = false));
  });
};

const changeStatus = (status: number) => {
  fetchSupportCategory(
    'change-status',
    {
      category_id: work.selectedCategory?.id ?? -1,
    },
    () => {
      if (work.selectedCategory) {
        work.selectedCategory.status = status;
      }
    }
  ).then(() => {
    console.log();
  });
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
        label: 'Таблица',
        action: () => (work.view = 'table'),
        condition: work.view === 'table',
      },
      {
        label: 'Плитка',
        action: () => (work.view = 'grid'),
        condition: work.view === 'grid',
      },
    ],
  },
]);

const categoryButtons = computed(() => [
  {
    label: 'Просмотр тикетов',
    icon: mdiStickerOutline,
    action: () => (work.section = 'list'),
    color: 'primary',
    condition: work.selectedCategory !== null && work.section !== 'list',
    loading: false,
  },
  {
    label: 'Просмотр менеджеров категории',
    icon: mdiAccountTie,
    action: () => (work.section = 'manager'),
    color: 'grey',
    condition: true,
    loading: false,
  },
  {
    label: 'Просмотр лога категории',
    icon: mdiEyeOutline,
    action: () => (work.section = 'log'),
    color: 'orange',
    condition: true,
    loading: false,
  },
  {
    label: 'Редактирование категории',
    icon: 'edit',
    action: () => (work.section = 'edit'),
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
