<template>
  <div class="q-pa-sm q-gutter-y-sm">
    <q-item clickable dense class="rounded bg-primary text-white">
      <q-item-section>
        <q-item-label class="text-center">Artsemi Puka</q-item-label>
      </q-item-section>
    </q-item>

    <q-list
      dense
      separator
      bordered
      class="text-size-12 text-weight-bold rounded overflow-hidden"
    >
      <q-item clickable>
        <q-item-section>ID</q-item-section>

        <q-item-section side>Single line item</q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section>Telegram ID</q-item-section>

        <q-item-section side>Single line item</q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section>Баланс</q-item-section>

        <q-item-section side>Single line item</q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section>Реферальный баланс</q-item-section>

        <q-item-section side>Single line item</q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section>Боты</q-item-section>

        <q-item-section side>Single line item</q-item-section>
      </q-item>
    </q-list>

    <div class="row">
      <q-btn
        flat
        no-caps
        class="col rounded text-weight-bold"
        size="12px"
        color="primary"
        label="Настройки"
      />

      <q-btn
        flat
        no-caps
        class="col rounded text-weight-bold"
        size="12px"
        color="primary"
        label="Поддержка"
      />
    </div>

    <div class="row">
      <q-btn
        class="col text-weight-bold rounded"
        no-caps
        flat
        size="12px"
        color="red-14"
        label="Выйти"
      />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>