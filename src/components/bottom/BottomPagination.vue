<template>
  <div class="row full-width" v-if="props.length > 0">
    <div class="col" v-for="(button, index) of leftButtons" :key="index">
      <bottom-pagination-button
        :icon="button.icon"
        :label="button.label"
        :action="button.action"
        :loading="button.loading"
      ></bottom-pagination-button>
    </div>

    <div class="col">
      <bottom-pagination-button :loading="loadings.search">
        <div class="">{{ page }} / {{ pages }}</div>

        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>New tab</q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>Downloads</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </bottom-pagination-button>
    </div>

    <div class="col" v-for="(button, index) of rightButtons" :key="index">
      <bottom-pagination-button
        :icon="button.icon"
        :label="button.label"
        :action="button.action"
        :loading="button.loading"
      ></bottom-pagination-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BottomPaginationButton from './BottomPaginationButton.vue';

const props = withDefaults(defineProps<BottomPaginationProps>(), {
  step: 5,
  length: 0,
  withoutSearch: false,
  withoutPages: false,
});

const emit = defineEmits<{
  (e: 'next', callback?: () => void): void;
  (e: 'prev', callback?: () => void): void;
  (e: 'last', callback?: () => void): void;
  (e: 'first', callback?: () => void): void;
  (e: 'search', callback?: () => void): void;
}>();

const page = ref(1);
const offset = ref(0);
const search = ref('');
const loadings = ref<Record<LoadingNames, boolean>>({
  next: false,
  prev: false,
  last: false,
  first: false,
  search: false,
});

const pages = computed(() => Math.ceil(props.length / props.step));

const searchPage = () => {
  const value = Number(search.value);

  if (value === 0 || value > pages.value) return;
};

const leftButtons = computed(() => [
  {
    label: 'Первая страница',
    icon: 'keyboard_double_arrow_left',
    loading: loadings.value.first,
    action: '',
  },
  {
    label: 'Пред.',
    icon: 'chevron_left',
    loading: loadings.value.prev,
    action: '',
  },
]);

const rightButtons = computed(() => [
  {
    label: 'След.',
    icon: 'chevron_right',
    loading: loadings.value.next,
    action: '',
  },
  {
    label: 'Последняя страница',
    icon: 'keyboard_double_arrow_right',
    loading: loadings.value.last,
    action: '',
  },
]);

interface BottomPaginationProps {
  step: number;
  length: number;
  withoutSearch?: boolean;
  withoutPages?: boolean;
}

type LoadingNames = 'next' | 'prev' | 'last' | 'first' | 'search';
</script>

<style scoped lang="scss"></style>
