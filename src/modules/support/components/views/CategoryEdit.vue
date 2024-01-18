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
        <div class="col-12 col-sm-8 col-xl-10">
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
        </div>

        <div class="col-12 col-sm-4 col-xl-2">
          <constants-section :constants="constants"></constants-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportCategory } from '../../api/queries';

import ConstantsSection from '../../../inline/components/settings/ConstantsSection.vue';

const support = useSupportStore();

const text = ref('');
const loading = ref(false);

const constants = {
  TICKET_ID: 'ID Тикета',
  CATEGORY_TITLE: 'Название категории',
  MESSAGE: 'Сообщение отправленное пользователем',
  NAME: 'Имя-ссылка/ник пользователя',
};

const updateTitle = () => {
  loading.value = true;
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
  ).then(() => (loading.value = false));
};

onMounted(() => {
  text.value = support.selectedCategory?.title ?? '';
});
</script>

<style scoped lang="scss"></style>
