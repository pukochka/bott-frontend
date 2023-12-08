<template>
  <div
    class="q-mx-xxl text-red row justify-center"
    v-if="!store.feedback.start && props.warning"
  >
    <q-card
      flat
      bordered
      class="q-mt-lg rounded row items-center justify-center"
    >
      <div class="text-center q-px-sm q-py-xs">Нет стартового сообщения!</div>

      <q-btn flat size="md" color="primary" icon="help" padding="4px">
        <q-menu max-width="300px" class="bott-portal-menu">
          <div class="q-pa-sm">
            Кликните на любое сообщение, затем переведите флажок стартового
            сообщения в утвердительное значение.
          </div></q-menu
        >
      </q-btn>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useFeedbackStore } from '../../stores/feedbackStore';

const props = withDefaults(defineProps<WarningStartProps>(), {
  warning: false,
});

const store = useFeedbackStore();

interface WarningStartProps {
  warning?: boolean;
}
</script>

<style scoped lang="scss"></style>
