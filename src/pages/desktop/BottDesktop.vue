<template>
  <div class="row">
    <q-btn
      outline
      no-caps
      size="lg"
      class="col rounded"
      color="primary"
      :label="t('my-bots')"
      to="/my-bots"
    />
  </div>

  <div class="bott-page__subtitle">Создать нового бота</div>

  <div class=""></div>

  <div class="row q-col-gutter-lg">
    <div class="col-12 col-sm-6" v-for="item in bottBots" :key="item.title">
      <q-card
        class="border__wide fit column"
        :class="['bott-note__block-' + item?.color ?? 'b']"
        flat
        bordered
      >
        <q-card-section class="row items-center no-wrap q-gutter-x-md">
          <q-icon :name="item.icon" size="32px" />

          <div class="text-h6">{{ item.title }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-caption">{{ item.desc }}</div>
        </q-card-section>

        <q-space />

        <q-card-section class="row">
          <q-btn
            flat
            align="left"
            class="rounded col"
            size="md"
            :icon="mdiLaunch"
            label="Создать"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from 'src/boot/lang';
import { mdiLaunch } from '@quasar/extras/mdi-v7';
import { bottBots } from '../../content/bots-meta';
</script>
