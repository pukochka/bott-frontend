<template>
  <div class="fit relative-position" style="min-height: 200px" ref="area">
    <!--    <div class="bott-page__title q-px-md q-py-lg">Категории вопросов</div>-->

    <!--    <q-breadcrumbs class="q-pa-md text-subtitle2">-->
    <!--      <q-breadcrumbs-el label="Home" />-->
    <!--      <q-breadcrumbs-el label="Components" />-->
    <!--      <q-breadcrumbs-el label="Breadcrumbs" />-->
    <!--    </q-breadcrumbs>-->

    <q-tab-panels
      v-model="support.main"
      animated
      class="q-pa-none bg-transparent"
      transition-next="fade"
      transition-prev="fade"
    >
      <q-tab-panel name="view" class="q-pa-none">
        <div class="">
          <header-section></header-section>

          <div class="relative-position">
            <top-section class="col-12"></top-section>

            <main-section class="col-12"></main-section>

            <bottom-section class="col-12"></bottom-section>

            <q-inner-loading
              style="z-index: 11"
              transition-show="none"
              :showing="support.loading.category"
              class="bott-page__background"
            >
              <q-spinner-gears size="80px" color="primary" />
            </q-inner-loading>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="chat" class="q-pa-none">
        <chat-section></chat-section>
      </q-tab-panel>
    </q-tab-panels>

    <q-inner-loading
      transition-show="none"
      :showing="support.loading.start"
      class="bott-page__background"
    >
      <q-spinner size="70px" color="primary" />
    </q-inner-loading>
  </div>

  <transfer-ticket></transfer-ticket>

  <transfer-implementer></transfer-implementer>

  <edit-ticket></edit-ticket>

  <select-category></select-category>

  <select-implementer></select-implementer>

  <media-player></media-player>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';

import { fetchSupportCategory, fetchSupportTicket } from './api/queries';
import { useSupportStore } from './stores/supportStore';
import { getQueryParam, has } from '../../utils/helpers/string';

import HeaderSection from './components/sections/HeaderSection.vue';
import MainSection from './components/sections/MainSection.vue';
import BottomSection from './components/sections/BottomSection.vue';
import TopSection from './components/sections/TopSection.vue';
import ChatSection from './components/chat/ChatSpace.vue';
import TransferTicket from './components/dialogs/TransferTicket.vue';
import EditTicket from './components/dialogs/EditTicket.vue';
import TransferImplementer from './components/dialogs/TransferImplementer.vue';
import SelectCategory from './components/dialogs/SelectCategory.vue';
import SelectImplementer from './components/dialogs/SelectImplementer.vue';
import MediaPlayer from './components/chat/MediaPlayer.vue';

const support = useSupportStore();
const area = ref();

onMounted(() => {
  support.topRef = area;
});

onBeforeMount(() => {
  const id = Number(getQueryParam('id')) ?? 0;
  const category_id = Number(getQueryParam('category_id')) ?? 0;

  if (window.innerWidth < 600) {
    support.view = 'grid';
  }

  if (has('id')) {
    support.main = 'chat';

    Promise.all([
      fetchSupportCategory('index', undefined, (response) => {
        const category = (response ?? []).find(
          (item: SupportCategory) => item.id === category_id
        );

        if (category !== void 0) {
          support.selectedCategory = category;
        }
      }),
      fetchSupportTicket('get-ticket', { ticket_id: id }, (response) => {
        support.selectedTicket = response;

        support.openChat(response);
      }),
    ]).then(() => (support.loading.start = false));

    return;
  }

  if (has('category_id')) {
    Promise.all([
      fetchSupportCategory('index'),
      support.updateCategory(category_id),
    ]).then(() => {
      const category = support.categories.find(
        (item) => item.id === category_id
      );

      if (category !== void 0) {
        support.selectedCategory = category;
        support.section = 'list';
      }

      support.loading.start = false;
    });

    return;
  }

  fetchSupportCategory('index', undefined, () => {
    support.loading.start = false;
  });
});

window.onpopstate = () => {
  if (!has('category_id')) {
    support.tickets = [];
    support.selectedCategory = null;
  }
  if (!has('id')) {
    support.closeChat();
  }
};
</script>

<style scoped lang="scss"></style>
