<template>
  <q-card square flat bordered class="absolute-bottom">
    <q-input
      borderless
      autogrow
      v-model="text"
      :maxlength="1024"
      input-class="font-16 q-pl-md max-height-150"
      placeholder="Написать сообщение..."
    >
      <template #append>
        <div class="">
          <q-btn
            flat
            padding="8px"
            class="rounded"
            size="md"
            color="primary"
            icon="send"
            :loading="loading"
            @click="sendMessage"
          />
        </div>
      </template>
    </q-input>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fetchSupportMessages } from '../../../api/queries';
import { useSupportStore } from '../../../stores/supportStore';

const support = useSupportStore();

const text = ref('');
const loading = ref(false);

const sendMessage = () => {
  if (text.value.length === 0) return;

  loading.value = true;
  fetchSupportMessages(
    'implementer-write',
    {
      ticket_id: support.selectedTicket?.id ?? -1,
      text: text.value,
      limit: 50,
    },
    (response) => {
      text.value = '';
      support.messages = response;
      setTimeout(support.scrollToBottom.bind(support), 10);
    }
  ).then(() => {
    loading.value = false;
  });
};
</script>

<style scoped lang="scss">
.max-height-150 {
  max-height: 150px;
}
</style>
