<template>
  <q-dialog v-model="work.dialogs.select_category" position="bottom" persistent>
    <q-card flat bordered style="width: 100%" class="dialog-rounded">
      <dialog-header label="Выбор категории"></dialog-header>

      <q-card-section class="q-pt-none">
        <q-list
          bordered
          separator
          class="rounded overflow-hidden"
          v-if="work.categories.length"
        >
          <q-item
            tag="label"
            clickable
            v-for="category of work.categories"
            :key="category.id"
          >
            <q-item-section>{{ category.title }}</q-item-section>

            <q-item-section side>
              <q-checkbox
                @update:model-value="updateCategory(category)"
                :model-value="work.selectedCategory?.id === category.id"
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
import { useWorkStore } from '../../stores/workStore';
import DialogHeader from 'src/components/dialogs-sections/DialogHeader.vue';
import { fetchSupportTicket } from '../../api/queries';

const work = useWorkStore();

const updateCategory = (category: SupportCategory) => {
  work.loading.category = true;

  work.tickets = [];
  work.section = 'list';
  work.selectedCategory = category;
  work.closeDialog('select_category');

  fetchSupportTicket('index', {
    category_id: category.id,
    offset: 25,
    limit: 25,
  }).then(() => {
    work.loading.category = false;
  });
};
</script>

<style scoped lang="scss"></style>
