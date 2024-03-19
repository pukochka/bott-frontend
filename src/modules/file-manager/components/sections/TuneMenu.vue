<template>
  <q-menu class="bott-portal-menu" max-height="200px">
    <q-list dense>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="grid_view" color="primary" size="24px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Количество видимых элементов</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>{{ data.pagination.count }}</q-item-label>
        </q-item-section>

        <q-menu fit class="bott-portal-menu">
          <q-list dense separator>
            <q-item
              clickable
              v-for="count in paginationCounts"
              :key="count"
              @click="changeCount(count)"
            >
              <q-item-section class="text-center">{{ count }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <action-button
        v-for="(button, index) of massActionsButtons"
        :key="index"
        :button="button"
        v-show="button.icon === 'compress' ? data.paths === 'photos' : true"
      ></action-button>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mdiSelectAll } from '@quasar/extras/mdi-v7';

import { useFileStore } from '../../stores/fileStore';

import { fetchFile } from '../../api/queries';
import { useDialog } from 'src/utils/use/useDialog';

import ActionButton from './ActionButton.vue';

const data = useFileStore();

const paginationCounts = [10, 25, 50];

const changeCount = (count: number) => {
  data.pagination.page = 1;
  data.pagination.count = count;
};

const deleteUnused = () => {
  useDialog(
    'Вы уверены, что хотите удалить все неиспользуемые файлы?',
    true
  ).onOk(() => {
    data.loadings.index = true;
    data.drawerInfo = true;

    fetchFile('delete-unused', undefined, () => {
      fetchFile('index');
    });
  });
};

const massActionsButtons = computed(() => [
  {
    label:
      data.selectedFiles.length === data.usersFiles.length
        ? 'Убрать все'
        : 'Выбрать все',
    action: data.selectAll,
    sortable: null,
    icon: mdiSelectAll,
    color: 'primary',
  },
  {
    label: 'Все файлы',
    action: () => (data.tabs = 'all'),
    sortable: null,
    icon: 'view_list',
    color: 'primary',
  },
  {
    label: 'Использованные',
    action: () => (data.tabs = 'used'),
    sortable: null,
    icon: 'filter',
    color: 'primary',
  },
  {
    label: 'Неиспользованные',
    action: () => (data.tabs = 'not-used'),
    sortable: null,
    icon: 'texture',
    color: 'primary',
  },
  {
    label: 'Сортировка по дате добавления',
    action: () => data.sort('date'),
    sortable: 'date',
    icon: 'filter_list',
    color: 'primary',
  },
  {
    label: 'Сортировка по размеру',
    action: () => data.sort('size'),
    sortable: 'size',
    icon: 'crop_square',
    color: 'primary',
  },
  {
    label: 'Cоотношение сторон',
    action: () =>
      data.imageFit === 'contain'
        ? (data.imageFit = 'cover')
        : (data.imageFit = 'contain'),
    sortable: null,
    icon: 'open_in_full',
    color: 'primary',
  },
  {
    label: 'Сжимать изображения',
    action: () => (data.compress = !data.compress),
    sortable: data.compress ? 'compress' : null,
    icon: 'compress',
    color: 'primary',
  },
  {
    label: 'Удалить неиспользованные',
    action: deleteUnused,
    sortable: null,
    icon: 'delete',
    color: 'red',
  },
]);
</script>

<style scoped lang="scss"></style>
