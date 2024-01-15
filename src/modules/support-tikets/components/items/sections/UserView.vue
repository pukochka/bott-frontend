<template>
  <q-item>
    <q-item-section>{{ label }}</q-item-section>

    <q-item-section side style="z-index: 1">
      <q-btn
        no-caps
        dense
        flat
        size="md"
        color="primary"
        class="rounded"
        :label="'@' + value"
      >
        <q-tooltip
          class="bott-tooltip"
          anchor="top middle"
          self="bottom middle"
        >
          Перейти в телеграм
        </q-tooltip>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<UserViewProps>(), {
  label: '',
  value: '',
});

interface UserViewProps {
  label: any;
  value: any;
}
</script>

<style scoped lang="scss"></style>
