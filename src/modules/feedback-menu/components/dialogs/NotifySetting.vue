<template>
  <q-dialog v-model="store.dialogs.notify" position="bottom" full-width>
    <div class="row justify-center">
      <q-card flat bordered class="dialog-rounded bott-dialog__responsive">
        <q-card-section>
          <div class="text-h6">Настройки уведомлений пользователя</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item
              v-for="([key], index) of Object.entries(store.feedback.setting)"
              :key="index"
            >
              <q-item-section>{{ text[key] }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { usePSStore } from '../../stores/feedbackStore';
import { computed, ref } from 'vue';

const store = usePSStore();

const label = ref('');

const text = {
  is_notice: 'Надо ли отправлять уведомления после ответа пользователя',
  user_limit: 'Лимит ответов на одного пользователя',
  time_notice: 'Время в минутах до отправки напоминания',
  time_cancel: 'Время в минутах до автоотмены',
  template_answer: 'Шаблон текста вопроса с ответом пользователя',
  limit_in_period: 'Лимит ответов пользователя за период',
  period: 'Длительность периода в минутах',
};
</script>

<style scoped lang="scss"></style>
