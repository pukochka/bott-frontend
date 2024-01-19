<template>
  <div class="q-gutter-y-sm">
    <div class="text-weight-bold text-center text-h6">
      Редактирование категории
      <span class="text-primary">
        {{ support.selectedCategory?.title ?? '' }}</span
      >
    </div>

    <div class="">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card flat bordered class="rounded q-pa-md">
            <q-input
              outlined
              counter
              v-model="text"
              :maxlength="48"
              :rules="[
                (val) =>
                  val.length >= 1 || 'Введено неверное количество символов',
              ]"
              label="Название категории"
              class="bott-input--rounded"
            >
              <template #append>
                <q-btn
                  no-caps
                  flat
                  size="md"
                  color="primary"
                  icon="check"
                  class="rounded"
                  :loading="loading"
                  :disable="text.length < 1"
                  @click="updateTitle"
                >
                  <q-tooltip
                    class="bott-tooltip text-center"
                    anchor="top middle"
                    self="bottom middle"
                  >
                    Изменить
                  </q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </q-card>

          <div class="relative-position q-pt-sm" style="min-height: 200px">
            <inline-menu
              v-if="!loading.message"
              :token="config.bot.token"
              :bot_id="config.bot.id"
              :host="config.host"
              :message="message"
            ></inline-menu>

            <q-inner-loading
              :showing="loading.message"
              class="bott-page__background"
            >
              <q-spinner size="50px" color="primary" />
            </q-inner-loading>
          </div>
        </div>

        <!--        <div class="col-12 col-sm-4 col-xl-2">-->
        <!--          <constants-section :constants="constants"></constants-section>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { config } from '../../config';

import { onMounted, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchMessage, fetchSupportCategory } from '../../api/queries';

import { defaultMessage } from '../../../scenarios/messages/stores/defaults';

import InlineMenu from '../../../inline/InlineMenu.vue';

const support = useSupportStore();

const text = ref('');
const message = ref(defaultMessage);
const loading = ref({
  title: false,
  message: true,
});

// const constants = {
//   TICKET_ID: 'ID Тикета',
//   CATEGORY_TITLE: 'Название категории',
//   MESSAGE: 'Сообщение отправленное пользователем',
//   NAME: 'Имя-ссылка/ник пользователя',
// };

const updateTitle = () => {
  loading.value.title = true;

  fetchSupportCategory(
    'update-title',
    {
      category_id: support.selectedCategory?.id ?? -1,
      title: text.value,
    },
    (response) => {
      if (support.selectedCategory) {
        support.selectedCategory.title = response;
      }
    }
  ).then(() => (loading.value.title = false));
};

onMounted(() => {
  text.value = support.selectedCategory?.title ?? '';
  loading.value.message = true;

  fetchMessage(
    'get',
    {
      message_id: support.selectedCategory?.view_category_id ?? -1,
    },
    (response) => {
      message.value = response;
    }
  ).then(() => (loading.value.message = false));
});
</script>

<style scoped lang="scss"></style>
