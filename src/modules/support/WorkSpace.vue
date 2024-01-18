<template>
  <div class="fit q-py-sm relative-position" style="min-height: 200px">
    <!--    <div class="bott-page__title q-px-md q-py-lg">Категории вопросов</div>-->

    <!--    <q-breadcrumbs class="q-pa-md text-subtitle2">-->
    <!--      <q-breadcrumbs-el label="Home" />-->
    <!--      <q-breadcrumbs-el label="Components" />-->
    <!--      <q-breadcrumbs-el label="Breadcrumbs" />-->
    <!--    </q-breadcrumbs>-->

    <div class="">
      <header-section></header-section>

      <div class="relative-position">
        <top-section class="col-12"></top-section>

        <main-section class="col-12"></main-section>

        <bottom-section class="col-12"></bottom-section>

        <q-inner-loading
          transition-show="none"
          :showing="support.loading.category"
          class="bott-page__background"
        >
          <q-spinner-gears size="80px" color="primary" />
        </q-inner-loading>
      </div>
    </div>

    <transition name="q-transition--fade">
      <chat-section v-if="support.chat" style="z-index: 10"></chat-section>
    </transition>

    <q-inner-loading
      transition-show="none"
      :showing="support.loading.start"
      class="bott-page__background"
    >
      <q-spinner size="70px" color="primary" />
    </q-inner-loading>
  </div>

  <transfer-ticket></transfer-ticket>

  <executor-transfer></executor-transfer>

  <edit-ticket></edit-ticket>

  <select-category></select-category>
</template>

<script setup lang="ts">
import { useSupportStore } from './stores/supportStore';

import HeaderSection from './components/sections/HeaderSection.vue';
import MainSection from './components/sections/MainSection.vue';
import BottomSection from './components/sections/BottomSection.vue';
import TopSection from './components/sections/TopSection.vue';
import ChatSection from './components/chat/ChatSpace.vue';
import TransferTicket from './components/dialogs/TransferTicket.vue';
import EditTicket from './components/dialogs/EditTicket.vue';
import ExecutorTransfer from './components/dialogs/ExecutorTransfer.vue';
import SelectCategory from './components/dialogs/SelectCategory.vue';
import { onBeforeMount } from 'vue';
import { fetchSupportCategory } from './api/queries';

const support = useSupportStore();

onBeforeMount(() => {
  fetchSupportCategory('index', undefined, () => {
    support.loading.start = false;
  });
});
</script>

<style scoped lang="scss"></style>
