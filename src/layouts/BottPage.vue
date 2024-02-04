<template>
  <router-view v-if="props.withoutFooter" />

  <div class="bott-page__content" v-else>
    <router-view v-if="props.default" />

    <div class="q-py-xl" :class="pageClasses" v-else>
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
  requiredParams: () => [],
  withoutFooter: false,
  default: false,
  withoutRight: false,
});

const quasar = useQuasar();
const states = useStatesStore();

const sm = computed(() => quasar.screen.lt.sm);

const pageClasses = computed(() =>
  sm.value ? ' q-gutter-y-sm q-pa-sm' : ' q-gutter-y-md q-pa-lg'
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
  default?: boolean;
  withoutFooter?: boolean;
  withoutRight?: boolean;
  requiredParams?: Array<string>;
}
</script>

<style lang="scss" scoped></style>
