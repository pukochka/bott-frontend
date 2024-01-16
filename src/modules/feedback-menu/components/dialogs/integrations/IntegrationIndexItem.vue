<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="integration.image" :alt="integration.name" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ integration.name }}</q-item-label>

      <q-item-label caption>{{ integration.description }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn
        dense
        flat
        no-caps
        class="rounded"
        color="primary"
        icon="more_vert"
        :loading="loading"
      >
        <q-menu class="bott-portal-menu">
          <q-list dense>
            <q-item
              clickable
              v-for="(button, index) of menuActions"
              :key="index"
              @click="button.action"
            >
              <q-item-section avatar>
                <q-icon :name="button.icon" :color="button.color" size="26px" />
              </q-item-section>

              <q-item-section>{{ button.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFeedbackStore } from '../../../stores/feedbackStore';
import { useDialog } from '../../../../file-manager/stores/useDialog';
import { fetchFeedbackIntegrations } from '../../../api/queries';
import { config } from '../../../config';

const props = withDefaults(defineProps<IntegrationIndexItemProps>(), {
  item: () => ({ id: -1 }),
});

const store = useFeedbackStore();

const loading = ref(false);

const integration = computed(
  () =>
    store.accessIntegrations.find((item) => item.id === props.item.id) ?? {
      id: -1,
      description: '',
      image: '',
      name: '',
    }
);

const deleteIntegration = () => {
  useDialog('Вы уверены, что хотите удалить интеграцию?', true).onOk(() => {
    loading.value = true;

    fetchFeedbackIntegrations('delete', {
      message_id: config.message_id,
      id: props.item.id,
    }).then(() => {
      store.updateIntegrations().then(() => (loading.value = false));
    });
  });
};

const editIntegration = () => {
  store.selectedIntegration = props.item;

  store.openDialog('api_edit');
};

const menuActions = computed(() => [
  {
    label: 'Изменить',
    icon: 'edit',
    color: 'primary',
    action: editIntegration,
  },
  {
    label: 'Удалить',
    icon: 'close',
    color: 'red',
    action: deleteIntegration,
  },
]);

interface IntegrationIndexItemProps {
  item: FeedbackIntegrationIndex;
}
</script>

<style scoped lang="scss"></style>
