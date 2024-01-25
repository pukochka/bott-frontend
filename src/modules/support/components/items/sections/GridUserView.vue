<template>
  <q-item>
    <q-item-section>{{ label }}</q-item-section>

    <q-item-section side :style="{ maxWidth: sm ? '130px' : '70%' }">
      <div
        v-if="value"
        v-html="value"
        class="text-primary text-center bott-token font-13"
      ></div>

      <div v-else class="bott-token font-13 text-red">Нет</div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const props = withDefaults(defineProps<UserViewProps>(), {
  label: '',
  value: '',
});

const quasar = useQuasar();

const sm = computed(() => quasar.screen.lt.sm);

interface UserViewProps {
  label: any;
  value: any;
}
</script>

<style scoped lang="scss"></style>
