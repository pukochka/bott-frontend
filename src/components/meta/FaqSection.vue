<template>
  <q-card flat bordered class="rounded q-px-sm q-pb-sm" v-if="visible">
    <panel-header label="FAQ" icon="help"></panel-header>

    <div v-html="text" v-if="text.length"></div>

    <div class="row q-col-gutter-y-xs">
      <div class="col-12" v-for="(item, index) of links" :key="index">
        <q-btn
          flat
          no-caps
          padding="4px"
          class="rounded fit"
          size="13px"
          color="primary"
          :href="item.link"
          :label="item.label"
        />
      </div>
    </div>

    <div class="row" v-if="video.length">
      <q-btn
        flat
        no-caps
        padding="4px"
        class="rounded col"
        size="13px"
        color="red"
        :href="video"
        :icon="mdiYoutube"
        label="Видео на YouTube"
      />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { mdiYoutube } from '@quasar/extras/mdi-v7';

import PanelHeader from './components/PanelHeader.vue';

const props = withDefaults(defineProps<FaqSectionProps>(), {
  faq: () => ({
    video: '',
    links: [],
    text: '',
  }),
});

const video = computed(() => props.faq.video);
const text = computed(() => props.faq.text);
const links = computed(() => props.faq.links);

const visible = computed(
  () => video.value.length || text.value.length || links.value.length
);

interface FaqSectionProps {
  faq: MessageFaqDto;
}
</script>

<style scoped lang="scss"></style>
