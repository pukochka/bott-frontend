<template>
  <q-scroll-area
    class="bott-drawer text-weight-medium text-size-13"
    :horizontal-thumb-style="{ visibility: 'hidden' }"
    :thumb-style="style.thumbStyle"
    :content-style="{ minHeight: 'inherit' }"
    @mouseenter="onEnter(true)"
    @mouseleave="onEnter(false)"
  >
    <q-list dense class="q-gutter-y-xs q-pa-sm">
      <q-item
        clickable
        v-ripple
        class="rounded header-btn bott-layout-menu"
        v-for="button in layoutButtons"
        :to="button.link"
        :key="button.label"
      >
        <q-item-section avatar>
          <q-icon :name="button?.icon" size="20px" color="primary" />
        </q-item-section>

        <q-item-section>
          {{ button.label }}
        </q-item-section>

        <q-badge
          v-if="button.is_new"
          floating
          rounded
          color="orange"
          text-color="white"
          label="new"
        />
      </q-item>
    </q-list>

    <q-separator inset v-if="drawerButtons.length" />

    <q-list dense class="q-gutter-y-xs q-pa-sm">
      <component
        dense
        clickable
        header-class="rounded header-btn text-icon-primary"
        class="rounded header-btn bott-layout-menu"
        :icon="button.icon"
        :expand-icon="mdiMenuDown"
        :label="button.label"
        :is="button.sub ? QExpansionItem : QItem"
        v-for="(button, index) of drawerButtons"
        :key="index"
        :to="button.link"
      >
        <q-item-section avatar v-if="!button.sub">
          <q-icon :name="button.icon" size="20px" color="primary" />
        </q-item-section>

        <q-item-section v-if="!button.sub">
          {{ button.label }}
        </q-item-section>

        <q-list dense class="q-pl-xl" v-else>
          <q-item
            dense
            clickable
            v-ripple
            v-for="(subButton, index) of button.sub(global.botData.type)"
            :key="index"
            class="rounded header-btn"
            :to="subButton.link"
          >
            <q-item-section>{{ subButton.label }}</q-item-section>
          </q-item>
        </q-list>
      </component>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { QItem, QExpansionItem } from 'quasar';

import { layoutButtons } from 'layouts/content/header';

import { useStatesStore } from 'stores/states/statesStore';
import { useStyleStore } from 'stores/style/styleStore';
import { useGlobalStore } from 'stores/data/globalStore';

import { mdiMenuDown } from '@quasar/extras/mdi-v7';

const props = withDefaults(defineProps<BottDrawerProps>(), {
  withoutFooter: false,
});

const emit = defineEmits<{
  (e: 'enter', value: boolean): void;
}>();

const style = useStyleStore();
const states = useStatesStore();
const global = useGlobalStore();

const drawerButtons = computed(() => states.props.drawer ?? []);

const onEnter = (value: boolean) => {
  if (!props.withoutFooter) return;

  emit('enter', value);
};

interface BottDrawerProps {
  withoutFooter?: boolean;
}
</script>

<style lang="scss" scoped></style>
