<template>
  <q-menu
    touch-position
    v-if="store.position.visible"
    max-width="300px"
    class="bott-portal-menu"
  >
    <div class="q-pa-xs text-subtitle1 text-center">Выберите тип вопроса</div>

    <q-separator></q-separator>

    <q-list>
      <q-item clickable v-ripple v-for="(type, index) of types" :key="index">
        <q-item-section>
          <q-item-label>{{ type.label }}</q-item-label>
          <q-item-label caption>{{ type.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePSStore } from '../stores/PSstore';

const store = usePSStore();

const types = computed(() => [
  {
    label: 'Ответ с сообщением',
    description:
      'Пользователю нужно будет ответить на сообщение. Сообщение будет проверено, при выборе вида проверки, в случае ошибки выведет текст который Вы введете.',
    id: 1,
  },

  {
    label: 'Ответ с файлом',
    description:
      'Пользователю нужно будет прислать файл, установленного расширения и размера.',
    id: 2,
  },

  {
    label: 'Опрос пользователя',
    description: 'Пользователю нужно будет выбрать подходящий ответ.',
    id: 3,
  },
]);
</script>

<style scoped lang="scss"></style>
