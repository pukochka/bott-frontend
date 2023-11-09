<template>
  <div class="col-12 col-md-6">
    <q-card flat bordered class="my-card rounded">
      <q-card-section class="q-px-sm q-pt-sm q-pb-none">
        <div class="row justify-between items-center">
          <div class="text-h6">{{ category.label }}</div>

          <div
            class="bott-token"
            :class="[' text-' + status[category.status].color]"
          >
            {{ status[category.status].label }}
          </div>
        </div>
      </q-card-section>

      <div class="row q-pa-sm">
        <q-btn
          dense
          outline
          no-caps
          size="md"
          color="warning"
          class="rounded col"
          label="Просмотр всех тикетов"
          @click="data.openDialog('view-tickets')"
        />
      </div>

      <q-card-section class="q-py-none q-px-sm">
        <div class="row q-col-gutter-sm" v-if="category.tickets?.length">
          <category-ticket
            v-for="(ticket, index) of category.tickets"
            :key="index"
            :ticket="ticket"
          ></category-ticket>
        </div>

        <div class="text-center text-body2 q-pa-sm" v-else>
          В этой категории нет тикетов
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm row justify-center q-col-gutter-xs">
        <category-buttons></category-buttons>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import CategoryButtons from './sections/CategoryButtons.vue';
import CategoryTicket from './sections/TicketItem.vue';
import { useDataStore } from '../stores/dataStore';

const props = withDefaults(defineProps<CategoryQuestionProps>(), {
  category: null,
});

const data = useDataStore();

const status = {
  0: { label: 'Закрыт', color: 'red' },
  1: { label: 'Активен', color: 'green' },
};

interface CategoryQuestionProps {
  category: any;
}
</script>

<style lang="scss" scoped></style>
