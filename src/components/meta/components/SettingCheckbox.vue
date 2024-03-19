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
const props = withDefaults(defineProps<SettingCheckboxProps>(), {
  setting: () => ({ label: '', key: '', type: 'checkbox', value: false }),
});

const emit = defineEmits<{
  (e: 'update-setting', key: string, value: boolean): void;
}>();

const updateSetting = (value: boolean) => {
  emit('update-setting', props.setting.key, value);
};

interface SettingCheckboxProps {
  setting: MessageFreeSettingsItem;
}
</script>

<style scoped lang="scss"></style>
