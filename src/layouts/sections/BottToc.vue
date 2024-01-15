<template>
  <q-scroll-area
    class="text-weight-medium text-size-13"
    style="width: 270px; height: 100%"
    :thumb-style="style.thumbStyle"
    :content-style="{ minHeight: 'inherit' }"
  >
    <div class="q-pa-sm">
      <q-list
        style="max-width: 270px"
        dense
        class="q-gutter-y-xs q-pa-sm"
        v-for="(section, index) in tocSections"
        :key="index"
      >
        <q-item-label class="text-center bott-page__text-body q-py-sm">
          {{ section.title }}
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="(button, index) in section.buttons(data.botData.type)"
          :to="button.link"
          :key="index"
          style="max-width: 270px"
          class="rounded header-btn bott-layout-menu"
        >
          <q-item-section avatar v-if="button.icon">
            <q-icon :name="button.icon" size="20px" />
          </q-item-section>

          <q-item-section style="white-space: normal">
            {{ button.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-scroll-area>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useStyleStore } from 'stores/style/styleStore';
import { useGlobalStore } from 'stores/data/globalStore';
import { useStatesStore } from 'stores/states/statesStore';

const style = useStyleStore();
const states = useStatesStore();
const data = useGlobalStore();

const tocSections = computed(() => states.props.toc ?? []);
</script>

<style lang="scss" scoped></style>
