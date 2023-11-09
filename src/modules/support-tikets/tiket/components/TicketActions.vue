<template>
  <q-card
    flat
    bordered
    class="rounded overflow-hidden fit column justify-between"
  >
    <q-list separator class="card-border__bottom">
      <q-item v-for="item in 7" :key="item">
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>

        <q-item-section side>Item with</q-item-section>
      </q-item>
    </q-list>

    <div class="q-pa-sm">
      <div class="row justify-center q-col-gutter-sm">
        <div class="col-6 col-sm-4" v-for="item in 5" :key="item">
          <q-btn
            flat
            size="md"
            class="rounded fit"
            color="primary"
            icon="check"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
