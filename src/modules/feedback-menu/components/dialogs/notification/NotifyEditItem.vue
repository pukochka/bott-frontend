<template>
  <q-item>
    <q-item-section>{{ item.label }}</q-item-section>

    <q-item-section class="col-3"></q-item-section>

    <q-btn
      flat
      padding="0 22px"
      color="primary"
      :label="item.value"
      class="absolute-right"
    >
      <q-tooltip
        class="bott-tooltip text-center"
        anchor="top middle"
        self="bottom middle"
      >
        Нажмите чтобы изменить
      </q-tooltip>

      <q-popup-proxy
        cover
        class="bott-portal-menu"
        @before-show="text = item.value"
      >
        <q-input
          dense
          outlined
          mask="#####"
          class="bott-input--rounded"
          v-model="text"
        >
          <template #append>
            <q-btn
              flat
              dense
              class="rounded"
              color="primary"
              icon="check"
              @click="emit('update', item, text)"
              v-close-popup
            />
          </template>
        </q-input>
      </q-popup-proxy>
    </q-btn>
  </q-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<NotifyEditItemProps>(), {
  item: () => ({ label: '', value: '', prop: 'time_notice' }),
});

const text = ref();

const emit = defineEmits<{
  (e: 'update', item: NotifyItem, value: any): void;
}>();

interface NotifyEditItemProps {
  item: NotifyItem;
}

interface NotifyItem {
  label: string;
  value: any;
  prop: keyof MessageFeedbackSetting;
}
</script>

<style scoped lang="scss"></style>
