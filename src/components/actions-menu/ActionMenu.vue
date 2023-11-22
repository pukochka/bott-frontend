<template>
  <div class="q-gutter-y-sm">
    <div class="q-py-xs">Выбор действия</div>

    <content-item
      search
      select
      :loading="loading"
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
      :loading="loading"
      :state="menu.options"
      :selected-item="menu.selectedOption"
      @select="selectOption"
    ></content-item>
  </div>
</template>
<script setup lang="ts">
import { watch, onBeforeMount, onUnmounted, ref } from 'vue';

import { useParse, useState } from './useMenu';

import { useMenuStore } from './stores/menuStore';
import { fetchMenu } from './api/queries';

import ContentItem from './ContentItem.vue';

const props = withDefaults(defineProps<ActionsMenuProps>(), {
  route: () => null,
  bot_id: 0,
  message_id: 0,
  token: '',
  host: '',
  index: false,
  static: false,
});

const emit = defineEmits<{
  (e: 'change', value: string | null): void;
}>();

const menu = useMenuStore();

const loading = ref(true);

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
  if (menu.routes.length && props.static) {
    loading.value = false;
    updateRoute();

    return;
  }

  fetchMenu(
    props.index ? 'index' : 'index-message',
    props.bot_id,
    props.token,
    props.message_id,
    props.host,
    updateRoute
  )
    .then(() => emit('change', menu.route))
    .then(() => (loading.value = false));
});

onUnmounted(() => {
  menu.options = [];
  menu.selectedOption = null;
});

interface ActionsMenuProps {
  route?: string | null;
  bot_id: number;
  message_id: number;
  token: string;
  host: string;
  index?: boolean;
  static?: boolean;
}
</script>

<style lang="scss" scoped></style>
