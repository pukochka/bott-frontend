<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="feedback.dialogs.message_free"
  >
    <div class="row justify-center">
      <q-card bordered flat class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Меню сообщения"></dialog-header>

        <q-card-section class="q-pt-none">
          <inline-menu
            :message="feedback.selectedMessageFree"
            :host="config.host"
            :bot_id="config.bot.id"
            :token="config.bot.token"
          ></inline-menu>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { config } from '../../config';
import { useFeedbackStore } from '../../stores/feedbackStore';
import InlineMenu from '../../../inline/InlineMenu.vue';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const feedback = useFeedbackStore();
</script>

<style scoped lang="scss"></style>
