<template>
  <div class="row no-wrap items-center q-gutter-x-sm">
    <q-btn-dropdown
      flat
      size="14px"
      padding="4px 8px"
      class="rounded text-weight-bold header-link header-btn"
      content-class="bott-portal-menu"
      v-for="button in headerButtons"
      :key="button.label"
      :label="button.label"
    >
      <q-list
        dense
        separator
        v-for="item in button.menu"
        :key="item.label"
        class="text-size-12 text-weight-bold"
      >
        <q-item-label header class="text-size-12">
          {{ item.label }}
        </q-item-label>

        <q-item
          clickable
          v-close-popup
          v-for="link in item.items"
          :key="link.label"
        >
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      unelevated
      no-caps
      icon="notifications"
      color="orange"
      size="14px"
      padding="4px 8px"
      class="rounded text-weight-bold header-btn"
    >
      <q-badge floating rounded color="red" text-color="white" label="12" />

      <q-menu anchor="top right" self="bottom right" class="bott-portal-menu">
        <notify-menu></notify-menu>
      </q-menu>
    </q-btn>

    <q-btn
      unelevated
      no-caps
      color="primary"
      padding="4px 8px"
      size="14px"
      class="rounded text-weight-bold header-btn"
    >
      <div
        class="row no-wrap items-center q-gutter-x-sm"
        style="max-width: 150px"
      >
        <q-icon name="person" size="20px" />

        <div class="ellipsis">AP</div>
      </div>

      <q-menu anchor="top right" self="bottom right" class="bott-portal-menu">
        <user-menu></user-menu>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { headerButtons } from 'layouts/content/header';

import UserMenu from 'layouts/sections/menu/UserMenu.vue';
import NotifyMenu from 'layouts/sections/menu/NotifyMenu.vue';
</script>

<style lang="scss" scoped></style>
