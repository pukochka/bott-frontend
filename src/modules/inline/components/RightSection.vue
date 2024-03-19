<template>
  <control-section :message="inline.message"></control-section>

  <message-free-settings
    v-if="!loading"
    :message="inline.message"
    :host="config.host"
    :bot-name="config.bot.name"
    :token="config.bot.token"
    :bot-id="config.bot.id"
    @update-type="updateType"
    @refresh="refreshMessage"
    @test="testMessage"
  ></message-free-settings>

  <faq-section :faq="inline.message.faq"></faq-section>

  <constants-section :constants="inline.message.constants"></constants-section>
</template>

<script setup lang="ts">
import { config } from '../config';

import { useInlineStore } from '../stores/inlineStore';
import { fetchMessage } from '../api/queries';
import { useDialog } from 'src/utils/use/useDialog';

import ControlSection from 'src/components/meta/ControlSection.vue';
import ConstantsSection from 'src/components/meta/ConstantsSection.vue';
import MessageFreeSettings from 'src/components/meta/MessageFreeSettings.vue';
import FaqSection from 'src/components/meta/FaqSection.vue';

withDefaults(defineProps<RightSectionProps>(), {
  loading: false,
});

const inline = useInlineStore();

const refreshMessage = (callback?: () => void) => {
  useDialog('Вы уверены, что хотите сбросить сообщение?', true).onOk(() => {
    fetchMessage('reset', { message_id: inline.message.id }, (response) => {
      inline.message = response;
    }).then(() => {
      if (callback !== void 0) callback();
    });
  });
};

const testMessage = (callback?: () => void) => {
  fetchMessage('test', {
    message_id: inline.message.id,
    user_id: user_id || 0,
  }).then(() => {
    if (callback !== void 0) callback();
  });
};

const updateType = () => {
  inline.openDialog('edit_type_message');
};

interface RightSectionProps {
  loading: boolean;
}
</script>

<style scoped lang="scss"></style>
