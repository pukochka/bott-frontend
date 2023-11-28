<template>
  <q-menu
    touch-position
    v-if="store.menu.link"
    max-width="300px"
    class="bott-portal-menu"
  >
    <q-list>
      <q-item
        dense
        clickable
        v-ripple
        v-for="(button, index) of buttons"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon :name="button.icon" :color="button.color" size="22px" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ button.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePSStore } from '../../stores/PSstore';

const store = usePSStore();

const buttons = computed(() => [
  {
    label: 'Добавить сообщение',
    icon: 'add',
    color: 'primary',
  },
  {
    label: 'Изменить текст кнопки',
    icon: 'edit',
    color: 'warning',
  },
  {
    label: 'Удалить связь',
    icon: 'close',
    color: 'red',
  },
]);
</script>

<style scoped lang="scss"></style>
