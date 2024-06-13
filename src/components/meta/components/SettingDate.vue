<template>
  <q-item clickable>
    <q-item-section>
      <q-item-label class="text-body2"> Эффект при отправке </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="bott-token text-red" v-if="withoutEffects">Нет</div>

      <q-icon
        v-else
        :name="metaEffects[<string>props.setting.value].icon"
        :color="metaEffects[<string>props.setting.value].color"
        size="26px"
        class="q-pr-md"
      />
    </q-item-section>

    <q-menu fit class="bott-portal-menu">
      <q-list dense>
        <q-item
          clickable
          v-for="(effect, index) of effects"
          :key="index"
          @click="emit('update-setting', props.setting.key, effect)"
        >
          <q-item-section avatar v-if="metaEffects[effect]">
            <q-icon
              :name="metaEffects[effect].icon"
              :color="metaEffects[effect].color"
              size="26px"
            />
          </q-item-section>

          <q-item-section>
            {{ metaEffects[effect].label || effect }}
          </q-item-section>

          <q-item-section side v-if="effect === props.setting.value">
            <q-icon name="check" color="primary" size="26px" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
</template>

<script setup lang="ts">
import { mdiEmoticonPoop, mdiFirework } from '@quasar/extras/mdi-v7';
import { computed } from 'vue';

const props = withDefaults(defineProps<SettingDateProps>(), {
  effects: () => ({}),
  setting: () => ({ label: '', key: '', type: 'checkbox', value: false }),
});

const emit = defineEmits<{
  (e: 'update-setting', key: string, value: string): void;
}>();

const effects = computed(
  (): Array<string> =>
    Object.values(Object.assign(props.effects || {}, { none: '' }))
);

const withoutEffects = computed(
  () =>
    !Object.values(props.effects).includes(<string>props.setting.value) ||
    props.setting.value === ''
);

const metaEffects: Record<
  string,
  { icon: string; label: string; color: string }
> = {
  '': {
    icon: 'close',
    label: 'Без эффектов',
    color: 'red',
  },
  '5104858069142078462': {
    icon: 'thumb_down',
    label: 'Дизлайки',
    color: 'grey',
  },
  '5104841245755180586': {
    icon: 'local_fire_department',
    label: 'Огоньки',
    color: 'orange',
  },
  '5046509860389126442': {
    icon: mdiFirework,
    label: 'Салют',
    color: 'positive',
  },
  '5044134455711629726': {
    icon: 'favorite',
    label: 'Сердечки',
    color: 'negative',
  },
  '5107584321108051014': {
    icon: 'thumb_up',
    label: 'Пальцы вверх',
    color: 'primary',
  },
  '5046589136895476101': {
    icon: mdiEmoticonPoop,
    label: 'Так себе...',
    color: 'brown',
  },
};

interface SettingDateProps {
  effects: Record<string, string>;
  setting: MessageFreeSettingsItem;
}
</script>

<style scoped lang="scss"></style>
