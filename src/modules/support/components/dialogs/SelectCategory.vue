<template>
  <q-dialog
    persistent
    position="bottom"
    v-model="support.dialogs.select_category"
    @before-show="updateShow"
  >
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-list
          bordered
          separator
          class="rounded overflow-hidden"
          v-if="support.categories.length"
        >
          <q-item
            tag="label"
            clickable
            v-for="category of support.categories"
            :key="category.id"
          >
            <q-item-section class="text-body1">
              {{ category.title }}
            </q-item-section>

            <q-item-section side>
              <q-radio
                v-model="selected"
                :val="category.id"
                @update:model-value="updateCategory(category)"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-center q-gutter-y-sm" v-else>
          <div class="">У Вас пока нет категорий...</div>
          <div class="">Для того чтобы выбрать кагегорию, создайте ёё</div>

          <div class="row justify-center">
            <q-btn
              no-caps
              flat
              size="md"
              color="primary"
              class="rounded"
              label="Создать категорию"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="row justify-end q-gutter-x-sm q-pt-none">
        <q-btn
          no-caps
          flat
          size="md"
          class="rounded"
          color="primary"
          label="Закрыть"
          v-close-popup
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';

import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const support = useSupportStore();

const selected = ref(0);

const updateCategory = (category: SupportCategory) => {
  selected.value = category.id;
  support.closeDialog('select_category');

  support.selectCategory(category);
};

const updateShow = () => {
  selected.value = support.selectedCategory?.id ?? 0;
};
</script>

<style scoped lang="scss"></style>
