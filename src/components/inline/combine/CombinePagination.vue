<template>
  <q-list bordered separator class="rounded overflow-hidden">
    <combine-message-item
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :view-message="props.message"
      @set-next-message="setNext"
    ></combine-message-item>

    <q-separator></q-separator>

    <div class="row no-wrap justify-center" v-if="pagination.count > 6">
      <q-btn
        v-for="button of leftButtons"
        :key="button.icon"
        square
        flat
        size="md"
        color="primary"
        :icon="button.icon"
        :loading="button.loading"
        :disable="pagination.page === 1"
        @click="button.action"
      />

      <q-btn
        square
        flat
        size="md"
        :loading="loading.search"
        :label="pagination.page + ' / ' + pagesCount"
      >
        <q-menu cover class="bott-portal-menu">
          <q-input
            outlined
            autofocus
            mask="###"
            class="bott-input--rounded"
            label="Введите номер старницы"
            v-model="search"
          >
            <template #append>
              <q-btn
                flat
                size="md"
                color="primary"
                icon="check"
                class="rounded"
                v-close-popup
                @click="searchPage"
              />
            </template>
          </q-input>
        </q-menu>
      </q-btn>

      <q-btn
        v-for="button of rightButtons"
        :key="button.icon"
        square
        flat
        size="md"
        color="primary"
        :icon="button.icon"
        :loading="button.loading"
        :disable="pagination.page === pagesCount"
        @click="button.action"
      />
    </div>
  </q-list>

  <q-inner-loading
    :showing="loading.start"
    class="bg-card"
    transition-show="none"
  >
    <q-spinner size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import { defaultMessage } from 'src/utils/helpers/defaults';
import CombineMessageItem from './CombineMessageItem.vue';
import { fetchMessages } from './query';

const props = withDefaults(defineProps<CombinePaginationProps>(), {
  message: () => defaultMessage,
  host: '',
  bot_id: 0,
  token: '',
});

const emit = defineEmits<{
  (e: 'set-next-message', next_id: number, callback?: () => void): void;
}>();

const search = ref('');
const messages = ref([]);
const pagination = ref({
  page: 1,
  offset: 0,
  count: 0,
});
const loading = ref<Record<ButtonNames, boolean>>({
  next: false,
  prev: false,
  last: false,
  first: false,
  search: false,
  start: false,
});

const pagesCount = computed(() => Math.ceil(pagination.value.count / 6));

const setNext = (next_id: number, callback?: () => void) => {
  emit('set-next-message', next_id, callback);
};

const updatePage = (side: ButtonNames) => {
  loading.value[side] = true;

  fetchMessages(
    'index',
    props.host,
    props.token,
    { bot_id: props.bot_id, offset: pagination.value.offset },
    (response) => {
      messages.value = response;
    }
  ).then(() => (loading.value[side] = false));
};

const nextPage = () => {
  if (pagination.value.page + 1 > pagesCount.value) return;

  pagination.value.page += 1;
  pagination.value.offset += 6;

  updatePage('next');
};

const prevPage = () => {
  if (pagination.value.page - 1 < 1) return;

  pagination.value.page -= 1;
  pagination.value.offset -= 6;

  updatePage('prev');
};

const firstPage = () => {
  pagination.value.page = 1;
  pagination.value.offset = 0;

  updatePage('first');
};

const lastPage = () => {
  pagination.value.page = pagesCount.value;
  pagination.value.offset = pagesCount.value * 6 - 6;

  updatePage('last');
};

const searchPage = () => {
  const value = Number(search.value) || 1;

  if (value > pagesCount.value || value < 1) return;

  pagination.value.page = value;
  pagination.value.offset = value * 6 - 6;

  updatePage('search');
};

const leftButtons = computed(() => [
  {
    icon: 'keyboard_double_arrow_left',
    action: firstPage,
    loading: loading.value.first,
  },
  {
    icon: 'chevron_left',
    action: prevPage,
    loading: loading.value.prev,
  },
]);

const rightButtons = computed(() => [
  {
    icon: 'chevron_right',
    action: nextPage,
    loading: loading.value.next,
  },
  {
    icon: 'keyboard_double_arrow_right',
    action: lastPage,
    loading: loading.value.last,
  },
]);

onBeforeMount(() => {
  loading.value.start = true;

  Promise.all([
    fetchMessages(
      'index',
      props.host,
      props.token,
      { bot_id: props.bot_id, offset: 0 },
      (response) => {
        messages.value = response;
      }
    ),
    fetchMessages(
      'count',
      props.host,
      props.token,
      { bot_id: props.bot_id, offset: 0 },
      (response) => {
        pagination.value.count = Number(response) || 0;
      }
    ),
  ]).then(() => (loading.value.start = false));
});

type ButtonNames = 'next' | 'prev' | 'last' | 'first' | 'search' | 'start';

interface CombinePaginationProps {
  message: MessageFree;
  host: string;
  bot_id: number;
  token: string;
}
</script>

<style scoped lang="scss"></style>
