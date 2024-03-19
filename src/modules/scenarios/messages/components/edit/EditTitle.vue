<template>
  <div
    class="col row items-center rounded bordered q-px-sm cursor-pointer no-wrap"
    @mouseleave="hover = false"
    @mouseenter="hover = true"
    :style="{ 'background-color': color }"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      Изменить название
    </q-tooltip>

    <div
      class="ellipsis bott-title__params"
      :class="[props.message.color ? ' text-' + textColor : '']"
    >
      {{ message.title }}
    </div>

    <q-space />

    <transition name="fade">
      <q-icon v-if="hover" name="edit" :color="textColor" size="18px" />
    </transition>

    <q-menu
      anchor="bottom start"
      self="top start"
      class="q-pa-sm rounded bott-portal-menu"
      v-model="edit_state"
    >
      <q-input
        outlined
        dense
        autofocus
        counter
        class="bott-input--rounded"
        color="primary"
        hint="Название сообщения"
        v-model="edit"
        :maxlength="64"
        @keyup.enter="updateTitle"
      >
        <template v-slot:append>
          <q-btn
            flat
            dense
            padding="4px"
            class="rounded"
            color="primary"
            icon="check"
            :loading="loading"
            @click="updateTitle"
          />
        </template>
      </q-input>

      <edit-color :message="message"></edit-color>
    </q-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';

import { isDarkColor } from 'src/utils/helpers/dom';

import { fetchMessage } from '../../api';

import { defaultMessage } from 'src/utils/helpers/defaults';

import EditColor from './EditColor.vue';

const props = withDefaults(defineProps<EditTitleProps>(), {
  message: () => defaultMessage,
});

const edit_state = ref(false);
const loading = ref(false);
const hover = ref(false);
const edit = ref('');

const color = computed(() =>
  props.message.color ? '#' + props.message.color.color : 'transparent'
);

const textColor = computed(() =>
  isDarkColor(props.message?.color?.color) ? 'white' : 'black'
);

const updateTitle = () => {
  loading.value = true;
  let message = props.message;

  fetchMessage(
    'update-title',
    {
      message_id: props.message.id,
      title: edit.value,
    },
    (response) => {
      message!.title = response.data.data;
    }
  ).then(() => {
    loading.value = false;
    edit_state.value = false;
  });
};

onBeforeMount(() => {
  edit.value = props.message.title;
});

interface EditTitleProps {
  message: MessageFree;
}
</script>

<style lang="scss"></style>
