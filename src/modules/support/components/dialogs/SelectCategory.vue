<template>
  <q-dialog
    v-model="support.dialogs.select_category"
    position="bottom"
    persistent
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
            <q-item-section>{{ category.title }}</q-item-section>

            <q-item-section side>
              <q-checkbox
                @update:model-value="updateCategory(category)"
                :model-value="support.selectedCategory?.id === category.id"
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
import { useSupportStore } from '../../stores/supportStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const support = useSupportStore();

const updateCategory = (category: SupportCategory) => {
  support.closeDialog('select_category');

  support.selectCategory(category);
};
</script>

<style scoped lang="scss"></style>
