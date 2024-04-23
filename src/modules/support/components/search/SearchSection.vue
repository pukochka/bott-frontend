<template>
  <q-inner-loading
    class="bott-page__background"
    :showing="support.search.value !== ''"
  >
    <div class="absolute-full q-pa-sm">
      <q-list padding>
        <q-item
          clickable
          dense
          class="rounded"
          active-class="bg-primary text-white"
          :active="selected === item.id"
          v-for="item of founding"
          :key="item.id"
          @click="searchTicket(item.id)"
        >
          <q-item-section>
            <q-item-label>
              {{ item?.text ? item.text : item.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="q-pa-xs" v-if="conditions.selectedUser">
        <div class="text-center" v-if="conditions.enterLeast">
          Введите ещё {{ enterLeast }} символ(a)
        </div>

        <div class="text-center" v-if="conditions.foundingUsers">
          Нажмите на пользователя для просмотра его тикетов
        </div>

        <div class="text-center" v-if="conditions.nothingFoundUser">
          Пользователя не найдено...
        </div>
      </div>

      <q-separator v-if="conditions.separator" />

      <div class="q-pa-xs" v-if="conditions.viewTickets">
        <div class="text-center" v-if="conditions.nothingFoundTicket">
          Ничего не найдено...
        </div>

        <ticket-item
          v-for="ticket of support.search.foundingTickets"
          :key="ticket.id"
          :ticket="ticket"
        ></ticket-item>
      </div>

      <div class="" v-if="support.search.name === 'title'">
        <div
          class="text-center"
          v-if="
            !support.search.foundingTicketsByTitle.length &&
            !support.search.loading
          "
        >
          Ничего не найдено...
        </div>
      </div>

      <div class="row justify-center" v-if="support.search.loading">
        <q-spinner color="primary" size="50px"></q-spinner>
      </div>
    </div>
  </q-inner-loading>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSupportStore } from '../../stores/supportStore';
import { fetchSupportTicket } from '../../api/queries';

import TicketItem from '../items/TicketItem.vue';

const support = useSupportStore();

const selected = ref<string | null>(null);

const founding = computed(() =>
  support.search.name === 'user'
    ? support.search.foundingUsers
    : support.search.foundingTicketsByTitle
);

const enterLeast = computed(() => 3 - support.search.value.length);

const conditions = computed(() => ({
  foundingUsers: support.search.foundingUsers.length,
  enterLeast: support.search.name === 'user' && support.search.value.length < 3,
  nothingFoundUser:
    !support.search.loading &&
    !support.search.foundingUsers.length &&
    support.search.value.length > 2,
  selectedUser: !support.search.tickets && support.search.name === 'user',

  nothingFoundTicket: !support.search.foundingTickets.length,
  viewTickets: !support.search.loading && support.search.tickets,
  separator: !support.search.loading && support.search.tickets,
}));

const searchTicket = (id: string) => {
  selected.value = id;
  support.search.loading = true;

  if (support.search.name === 'title') {
    fetchSupportTicket('get-ticket', { ticket_id: Number(id) }, (response) => {
      const ticket = response;

      support.selectedTicket = ticket;

      support.openChat(ticket);
    }).then(() => (support.search.loading = false));
    return;
  }

  support.search.tickets = true;

  fetchSupportTicket(
    'search-author',
    {
      category_id: support.selectedCategory?.id ?? 0,
      limit: 10,
      user_id: Number(id),
      offset: 0,
    },
    (response) => {
      support.search.foundingTickets = response;
    }
  ).then(() => (support.search.loading = false));

  setTimeout(() => (support.search.loading = false), 1500);
};
</script>

<style scoped lang="scss"></style>
