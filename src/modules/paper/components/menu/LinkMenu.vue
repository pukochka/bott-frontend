<template>
  <q-menu
    touch-position
    v-if="store.menu.link"
    max-width="300px"
    class="bott-portal-menu"
  >
    <q-list>
      <q-item
        dense
        clickable
        v-ripple
        v-for="(button, index) of buttons"
        :key="index"
        @click="button.action"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="22px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ button.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePSStore } from '../../stores/PSstore';
import { fetchFeedback } from '../../api/queries';
import { update } from '../../utils/create';

const store = usePSStore();

const loading = ref({
  delete: false,
  add: false,
});

const addMessage = () => {
  loading.value.add = true;

  // fetchFeedback('create-input', {}, (response) => {
  //   store._feedback = response.feedback;
  //
  //   update();
  // }).then(() => {
  //   store.menu.link = false;
  //   loading.value.delete = false;
  // });
};

const deleteLink = () => {
  loading.value.delete = true;

  fetchFeedback('set-input-next', {
    input_id: store.selectedMessage?.id ?? 0,
    type: store.selectedMessage?.type ?? 1,
    next_id: null,
    next_type: null,
  }).then(() => {
    store.menu.link = false;
    loading.value.delete = false;
  });
};

const buttons = computed(() => [
  {
    label: 'Dcnfdbnm сообщение',
    icon: 'add',
    color: 'primary',
    action: addMessage,
  },
  {
    label: 'Изменить текст кнопки',
    icon: 'edit',
    color: 'warning',
    action: () => store.openDialog('message'),
  },
  {
    label: 'Удалить связь',
    icon: 'close',
    color: 'red',
    action: deleteLink,
  },
]);
</script>

<style scoped lang="scss"></style>
