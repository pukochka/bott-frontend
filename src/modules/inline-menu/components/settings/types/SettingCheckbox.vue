<template>
  <q-item tag="label" clickable dense>
    <q-item-section>
      <q-item-label class="text-body2">{{ props.setting.label }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-toggle
        color="primary"
        :model-value="setting.value"
        @update:model-value="updateSetting"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useInlineStore } from '../../../stores/inlineStore';
import { fetchSettings } from '../../../api/queries';
import {
  defaultSettingItem,
  InlineSettingsItem,
} from '../../../stores/inlineModels';

const props = withDefaults(defineProps<SettingCheckboxProps>(), {
  setting: () => defaultSettingItem,
});

const emit = defineEmits<{
  (e: 'loading', value: boolean): void;
}>();

const inline = useInlineStore();

const updateSetting = (value: boolean) => {
  const setting = inline.settings.find(
    (item) => item.key === props.setting.key
  );
  if (setting) {
    setting.value = value;

    emit('loading', true);
    fetchSettings('update-settings', inline.message.id, inline.mappedKeys).then(
      () => emit('loading', false)
    );
  }
};

interface SettingCheckboxProps {
  setting: InlineSettingsItem;
}
</script>

<style scoped lang="scss"></style>
