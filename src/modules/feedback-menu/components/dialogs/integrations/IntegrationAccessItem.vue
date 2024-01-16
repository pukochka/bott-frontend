<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="props.item.image" :alt="props.item.name" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.item.name }}</q-item-label>

      <q-item-label caption>{{ props.item.description }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn
        flat
        no-caps
        class="rounded"
        color="primary"
        padding="4px 8px"
        label="Добавить"
        :loading="loading"
        @click="addIntegration"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { config } from '../../../config';
import { ref } from 'vue';
import { fetchFeedbackIntegrations } from '../../../api/queries';
import { useFeedbackStore } from '../../../stores/feedbackStore';

const props = withDefaults(defineProps<IntegrationAccessItemProps>(), {
  item: () => ({ id: -1, description: '', image: '', name: '' }),
});

const store = useFeedbackStore();

const loading = ref(false);

const addIntegration = () => {
  loading.value = true;

  fetchFeedbackIntegrations('create', {
    message_id: config.message_id,
    type: props.item.id,
  }).then(() => {
    store.updateIntegrations().then(() => (loading.value = false));
  });
};

interface IntegrationAccessItemProps {
  item: FeedbackIntegrationAccess;
}
</script>

<style scoped lang="scss"></style>
