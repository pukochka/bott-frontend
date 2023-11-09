<template>
  <router-view v-if="props.withoutFooter" />

  <div class="bott-page__content" v-else>
    <div class="q-pa-lg q-py-xl" :class="pageClasses">
      <div class="bott-page__title">{{ title }}</div>

      <bott-breadcrumbs></bott-breadcrumbs>

      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated } from 'vue';
import { t } from 'src/boot/lang';

import { useMeta, useQuasar } from 'quasar';
import { useStatesStore } from 'stores/states/statesStore';

import BottBreadcrumbs from 'layouts/sections/BottBreadcrumbs.vue';

const props = withDefaults(defineProps<BottPageProps>(), {
  title: '',
  drawer: () => [],
  toc: () => [],
  withoutFooter: false,
  requiredParams: () => [],
});

const quasar = useQuasar();
const states = useStatesStore();

const pageClasses = computed(() =>
  quasar.screen.lt.sm ? ' q-gutter-y-sm' : ' q-gutter-y-md'
);

const setPageProps = () => {
  states.props = props;

  useMeta({
    title: props.title + ' | ' + t('footer-desc'),
  });
};

onMounted(setPageProps);
onUpdated(setPageProps);

interface BottPageProps {
  title: string;
  drawer?: BOTTDrawerButtons[];
  toc?: [];
  withoutFooter?: boolean;
  requiredParams?: Array<string>;
}
</script>

<style lang="scss" scoped></style>
