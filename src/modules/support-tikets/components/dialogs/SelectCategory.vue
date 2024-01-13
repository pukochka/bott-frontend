<template>
  <q-dialog v-model="work.dialogs.select_category" position="bottom" persistent>
    <q-card style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-list bordered separator class="rounded overflow-hidden">
          <q-item
            tag="label"
            clickable
            v-for="category of work.categories"
            :key="category.id"
          >
            <q-item-section>{{ category.label }}</q-item-section>

            <q-item-section side>
              <q-checkbox
                @update:model-value="updateCategory(category)"
                :model-value="work.selectedCategory?.id === category.id"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
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
import { useWorkStore } from '../../stores/workStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';

const work = useWorkStore();

const updateCategory = (category: any) => {
  work.closeDialog('select_category');
  work.selectedCategory = category;
  work.section = 'list';
};
</script>

<style scoped lang="scss"></style>
