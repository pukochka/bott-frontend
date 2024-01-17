<template>
  <div class="q-gutter-y-sm">
    <div class="text-weight-bold text-center text-h6">
      Редактирование категории
      <span class="text-primary">
        {{ work.selectedCategory?.title ?? '' }}</span
      >
    </div>

    <div class="">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-8 col-xl-10">
          <q-card flat bordered class="rounded q-pa-md">
            <div class="q-pb-sm">Название категории</div>

            <q-input
              outlined
              v-model="text"
              :maxlength="64"
              label="Название категории"
              class="bott-input--rounded"
            />
          </q-card>
        </div>

        <div class="col-12 col-sm-4 col-xl-2">
          <constants-section :constants="constants"></constants-section>

          <div class="row justify-end q-pt-md">
            <q-btn
              no-caps
              unelevated
              size="md"
              color="primary"
              label="Сохранить"
              class="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorkStore } from '../../stores/workStore';
import EditorContent from '../../../../components/editor/EditorContent.vue';
import ConstantsSection from '../../../inline/components/settings/ConstantsSection.vue';

const work = useWorkStore();

const text = ref('');

const constants = {
  TICKET_ID: 'ID Тикета',
  CATEGORY_TITLE: 'Название категории',
  MESSAGE: 'Сообщение отправленное пользователем',
  NAME: 'Имя-ссылка/ник пользователя',
};
</script>

<style scoped lang="scss"></style>
