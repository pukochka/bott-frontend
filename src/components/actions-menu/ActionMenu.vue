<template>
  <div class="q-gutter-y-sm">
    <div class="q-py-xs">Выбор действия</div>

    <content-item
      search
      select
      :state="menu.routes"
      :search-items="menu.search"
      :selected-item="menu.selectedMain"
      @search="selectSearch"
      @select="selectMain"
    ></content-item>

    <div class="q-py-xs" v-if="menu.is_options">
      {{ menu.default_text }}
    </div>

    <div class="text-red text-center items-end" v-if="menu.is_error">
      <q-icon name="warning" color="red" size="20px" />

      {{ menu.error_text }}
    </div>

    <content-item
      select
      v-if="menu.is_options"
      :state="menu.options"
      :selected-item="menu.selectedOption"
      @select="selectOption"
    ></content-item>
  </div>
</template>
<script setup lang="ts">
import { watch, onBeforeMount, onUnmounted } from 'vue';

import { useParse, useState } from './useMenu';

import { useMenuStore } from './stores/menuStore';
import { fetchMenu } from './api/queries';

import ContentItem from './ContentItem.vue';

const props = withDefaults(defineProps<ActionsMenuProps>(), {
  route: () => null,
});

const emit = defineEmits<{
  (e: 'change', value: string | null): void;
}>();

const menu = useMenuStore();

const selectMain = (item: RoutesMenu) => useState(item);
const selectOption = (item: OptionsMenu) => (menu.selectedOption = item);
const selectSearch = (item: OptionsMenu | RoutesMenu) => useParse(item.route);

watch(
  () => menu.route,
  (val) => {
    emit('change', val);
  }
);

const updateRoute = () => {
  if (props.route === null) {
    menu.selectedMain = menu.routes[0];
    return;
  }

  useParse(props.route);
};

onBeforeMount(() => {
  if (menu.routes.length) {
    updateRoute();

    return;
  }

  fetchMenu(updateRoute).then(() => {
    emit('change', menu.route);
  });
});

onUnmounted(() => {
  menu.options = [];
  menu.selectedOption = null;
});

interface ActionsMenuProps {
  route?: string | null;
}
</script>

<style lang="scss" scoped></style>
