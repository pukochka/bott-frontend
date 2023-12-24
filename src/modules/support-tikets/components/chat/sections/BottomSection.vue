<template>
  <q-card square flat bordered class="absolute-bottom">
    <q-input
      borderless
      autogrow
      v-model="text"
      input-class="font-16 q-py-none"
      placeholder="Написать сообщение..."
    >
      <template #prepend>
        <div class="">
          <q-btn
            flat
            padding="8px"
            class="rounded"
            size="md"
            color="primary"
            icon="attach_file"
          />
        </div>
      </template>

      <template #append>
        <div class="">
          <q-btn
            flat
            padding="8px"
            class="rounded"
            size="md"
            color="primary"
            icon="send"
          />
        </div>
      </template>
    </q-input>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
</script>

<style scoped lang="scss"></style>
