<template>
  <q-dialog
    persistent
    full-width
    position="bottom"
    v-model="store.dialogs.message_free"
  >
    <div class="row justify-center">
      <q-card class="dialog-rounded bott-dialog__responsive">
        <dialog-header label="Меню сообщения"></dialog-header>

        <q-card-section class="q-pt-none">
          <inline-menu
            :message="store.selectedMessageFree"
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
import { usePSStore } from '../../stores/PSstore';
import InlineMenu from '../../../inline-menu/InlineMenu.vue';
import DialogHeader from '../../../../components/dialogs-sections/DialogHeader.vue';
import { config } from '../../config';

const store = usePSStore();
</script>

<style scoped lang="scss"></style>
