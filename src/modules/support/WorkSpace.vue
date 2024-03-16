<template>
  <div class="fit relative-position" style="min-height: 200px">
    <header-section></header-section>

    <div class="" id="support-work-space">
      <q-tab-panels
        v-if="sm"
        animated
        v-model="support.panel"
        class="bg-transparent"
        :style="{ height: `calc(100vh - ${support.offsetTop}px)` }"
      >
        <q-tab-panel name="tickets" class="q-pa-none">
          <left-panel></left-panel>
        </q-tab-panel>

        <q-tab-panel name="chat" class="q-pa-none">
          <right-panel></right-panel>
        </q-tab-panel>
      </q-tab-panels>

      <main-section v-else></main-section>
    </div>

    <q-inner-loading
      style="z-index: 10"
      transition-show="none"
      class="bott-page__background"
      :showing="support.loading.start"
    >
      <q-spinner size="70px" color="primary" />
    </q-inner-loading>
  </div>

  <category-create></category-create>

  <category-edit></category-edit>

  <category-implementers></category-implementers>

  <category-log></category-log>

  <category-select></category-select>

  <implementer-select></implementer-select>

  <implementer-transfer></implementer-transfer>

  <ticket-edit></ticket-edit>

  <ticket-transfer></ticket-transfer>

  <media-player></media-player>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue';

import { fetchSupportCategory, fetchSupportTicket } from './api/queries';
import { useSupportStore } from './stores/supportStore';
import { getQueryParam, has } from 'src/utils/helpers/string';
import { getRect } from '../../utils/helpers/dom';
import { useQuasar } from 'quasar';

import HeaderSection from './components/sections/HeaderSection.vue';
import MainSection from './components/sections/MainSection.vue';
import TicketTransfer from './components/dialogs/TicketTransfer.vue';
import TicketEdit from './components/dialogs/TicketEdit.vue';
import ImplementerTransfer from './components/dialogs/ImplementerTransfer.vue';
import ImplementerSelect from './components/dialogs/ImplementerSelect.vue';
import CategoryCreate from './components/dialogs/CategoryCreate.vue';
import CategoryEdit from './components/dialogs/CategoryEdit.vue';
import CategoryImplementers from './components/dialogs/CategoryImplementers.vue';
import CategoryLog from './components/dialogs/CategoryLog.vue';
import CategorySelect from './components/dialogs/CategorySelect.vue';
import MediaPlayer from './components/chat/media-player/MediaPlayer.vue';
import LeftPanel from './components/sections/LeftPanel.vue';
import RightPanel from './components/sections/RightPanel.vue';

const support = useSupportStore();
const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);

onMounted(() => (support.topRef = getRect('support-work-space')));

onBeforeMount(() => {
  const id = Number(getQueryParam('id'));
  const category_id = Number(getQueryParam('category_id'));

  Promise.all([
    fetchSupportCategory('index', undefined),
    !isNaN(category_id) ? support.updateCategory(category_id) : '',
    !isNaN(id) ? fetchSupportTicket('get-ticket', { ticket_id: id }) : '',
  ]).then(() => {
    const category =
      support.categories.find((item) => item.id === category_id) || null;

    if (category) {
      support.selectCategory(category);
    }

    if (support.selectedTicket) {
      support.openChat(support.selectedTicket);
    }

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
