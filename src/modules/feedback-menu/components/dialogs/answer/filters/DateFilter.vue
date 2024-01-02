<template>
  <q-item-section>
    <div class="row items-center justify-center q-gutter-x-xs">
      <q-item-label>Время ответа</q-item-label>

      <q-btn
        flat
        size="md"
        color="primary"
        icon="calendar_month"
        class="rounded"
        padding="4px"
        :loading="loading"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Искать по дате
        </q-tooltip>

        <q-menu class="bott-portal-menu" v-model="menu">
          <q-date
            v-model="date"
            minimal
            range
            @update:model-value="filterByDate"
          />
        </q-menu>
      </q-btn>
    </div>
  </q-item-section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchFeedbackAnswer } from '../../../../api/queries';

const props = withDefaults(defineProps<FilterProps>(), {
  update: false,
});

const emit = defineEmits<{
  (e: 'filter'): void;
}>();

const date = ref<{ from: string; to: string } | null>(null);
const loading = ref(false);
const menu = ref(false);

const filterByDate = () => {
  emit('filter');
  loading.value = true;
  menu.value = false;

  fetchFeedbackAnswer('index', {
    start_created_time: date.value?.from ?? '',
    end_created_time: date.value?.to ?? '',
  }).then(() => (loading.value = false));
};

watch(
  () => props.update,
  (val) => {
    if (!val) {
      date.value = null;
    }
  }
);

interface FilterProps {
  update: boolean;
}
</script>

<style scoped lang="scss"></style>
