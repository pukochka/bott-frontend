<template>
  <q-btn
    v-bind="attrs"
    flat
    size="md"
    color="primary"
    icon="mood"
    id="emoji"
    @click="dialog = !dialog"
  >
    <q-tooltip
      class="bott-tooltip text-center"
      anchor="top middle"
      self="bottom middle"
    >
      {{ t('add-emoji') }}
    </q-tooltip>
  </q-btn>

  <q-dialog v-model="dialog" position="bottom" seamless>
    <q-card style="width: 100%" flat bordered class="dialog-rounded q-px-md">
      <div class="row q-py-md">
        <q-btn
          no-caps
          flat
          dense
          class="col rounded"
          size="md"
          color="primary"
          icon="close"
          :label="t('button-close')"
          v-close-popup
        />
      </div>

      <div class="bordered rounded overflow-hidden">
        <scroll-list-update
          role="row"
          :visible-items="70"
          :items="emojiItems"
          :height="250"
        >
          <template v-slot="{ item }">
            <q-btn
              flat
              class="rounded col-2"
              padding="4px"
              color="primary"
              :label="item.char"
              @click="emit('select', item.char)"
            />
          </template>
        </scroll-list-update>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { emojiItems } from './emoji-items';
import { t } from 'src/boot/lang';
import ScrollListUpdate from '../scroll-update/ScrollListUpdate.vue';

const props = withDefaults(defineProps<EmojiMenuProps>(), {
  editor: false,
});

const attrs = computed(() => {
  return props.editor
    ? {
        class: 'rounded',
        rounded: true,
        padding: '4px',
      }
    : { round: true };
});

const dialog = ref(false);

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

interface EmojiMenuProps {
  editor?: boolean;
}
</script>

<style lang="scss" scoped></style>
