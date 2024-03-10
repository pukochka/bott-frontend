<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        {{ item.user.first_name }} {{ item.user.last_name }}
      </q-item-label>

      <q-item-label caption class="text-primary">
        <q-btn
          flat
          padding="0px 4px"
          no-caps
          size="12px"
          color="primary"
          class="rounded"
          :label="'@' + item.user.username"
          @click="copy"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Скопировать
          </q-tooltip>
        </q-btn>
      </q-item-label>
    </q-item-section>

    <q-btn
      flat
      dense
      square
      color="red"
      icon="close"
      class="absolute-right"
      :loading="loading"
      @click="deleteUser"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Удалить администратора/ресурс
      </q-tooltip>
    </q-btn>
  </q-item>
</template>

<script setup lang="ts">
import { defaultNotify } from '../../../stores/feedbackModels';
import { useDialog } from '../../../../file-manager/stores/useDialog';
import { fetchFeedbackNotify } from '../../../api/queries';
import { ref } from 'vue';
import { useFeedbackStore } from '../../../stores/feedbackStore';
import { copyToClipboard } from 'quasar';

const props = withDefaults(defineProps<NotifyItemProps>(), {
  item: () => defaultNotify,
});

const feedback = useFeedbackStore();

const loading = ref(false);

const copy = () => {
  copyToClipboard('@' + props.item.user.username);
};

const deleteUser = () => {
  useDialog('Вы уверены, что хотите удалить администратора/ресурс?', true).onOk(
    () => {
      loading.value = true;

      fetchFeedbackNotify('delete', { id: props.item.id }, () => {
        feedback.notifications = feedback.notifications.filter(
          (item) => item.id !== props.item.id
        );
      }).then(() => (loading.value = false));
    }
  );
};

interface NotifyItemProps {
  item: FeedbackNotification;
}
</script>

<style scoped lang="scss"></style>
