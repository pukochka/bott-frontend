<template>
  <q-item-section>
    <div class="row items-center justify-center q-gutter-x-xs">
      <q-item-label>Статус</q-item-label>

      <q-btn
        flat
        size="md"
        color="primary"
        icon="fact_check"
        class="rounded"
        padding="4px"
        :loading="loading"
      >
        <q-tooltip
          class="bott-tooltip text-center"
          anchor="top middle"
          self="bottom middle"
        >
          Искать по статусу
        </q-tooltip>

        <q-menu class="bott-portal-menu">
          <q-list dense>
            <q-item
              clickable
              v-for="[status, value] of Object.entries(statuses)"
              :key="status"
              @click="filterByStatus(status)"
            >
              <q-item-section :class="['text-' + value.color]">
                {{ value.label }}
              </q-item-section>

              <q-item-section avatar v-if="selected === status">
                <q-icon name="check" :color="value.color" size="26px" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-item-section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { statuses } from '../../../../stores/feedbackModels';
import { fetchFeedbackAnswer } from '../../../../api/queries';

const props = withDefaults(defineProps<FilterProps>(), {
  update: false,
});

const emit = defineEmits<{
  (e: 'filter'): void;
}>();

const loading = ref(false);
const selected = ref('');

const filterByStatus = (status: string) => {
  emit('filter');
  selected.value = status;
  loading.value = true;

  fetchFeedbackAnswer('index', {
    status: Number(status),
  }).then(() => (loading.value = false));
};

watch(
  () => props.update,
  (val) => {
    if (!val) {
      selected.value = '';
    }
  }
);

interface FilterProps {
  update: boolean;
}
</script>

<style scoped lang="scss"></style>
