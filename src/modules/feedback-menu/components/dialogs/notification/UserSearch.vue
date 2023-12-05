<template>
  <q-menu class="bott-portal-menu" cover fit @before-show="updateShow">
    <q-input
      dense
      outlined
      autofocus
      label="Поиск пользователя"
      color="primary"
      debounce="300"
      class="bott-input--rounded q-ma-xs"
      :hint="search.length <= 2 ? 'Введите хотя бы 3 символа' : undefined"
      v-model="search"
      :loading="loading"
      @update:model-value="fetchSearch"
    />

    <q-list dense>
      <q-item
        :clickable="!empty"
        v-for="item of result"
        :key="item.id"
        @click="select(item.id)"
      >
        <q-item-section class="text-center q-pa-lg" v-if="empty">
          Ничего не нашлось...
        </q-item-section>

        <q-item-section class="text-center text-primary" v-else>
          {{ item.text }}
        </q-item-section>

        <q-tooltip
          v-if="!empty"
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Нажмите для добавления
        </q-tooltip>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<UserSearchProps>(), {
  bot_id: 0,
  token: '',
});

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

const search = ref('');
const loading = ref(false);
const result = ref<UserSearchResult[]>([]);

const empty = computed(
  () => result.value[0].id === '' || search.value.length <= 2
);

const select = (id: string) => {
  if (empty.value) return;

  emit('select', id);
};

const fetchSearch = async () => {
  if (search.value.length <= 2) {
    result.value = [];
    return;
  }

  loading.value = true;
  return axios({
    method: 'get',
    url: 'https://api.bot-t.com/v2/ajax/bot/user/name',
    params: { bot_id: props.bot_id, token: props.token, q: search.value },
  }).then((response) => {
    loading.value = false;
    if (!response.data?.results) return;

    result.value = response.data?.results ?? [];
  });
};

const updateShow = () => {
  result.value = [];
  search.value = '';
};

interface UserSearchResult {
  id: string;
  text: string;
}
interface UserSearchProps {
  bot_id: number;
  token: string;
}
</script>

<style scoped lang="scss"></style>
