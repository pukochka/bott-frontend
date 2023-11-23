<template>
  <div class="col-4">
    <div
      class="row justify-center items-center q-mb-sm relative-position"
      style="min-height: 28px"
    >
      <transition name="q-transition--fade">
        <div class="absolute-left row items-center" v-if="props.open">
          <q-btn
            flat
            size="12px"
            padding="2px"
            color="primary"
            icon="help_center"
            class="rounded"
          />
        </div>
      </transition>

      <div class="text-body2 text-center" style="max-width: 140px">
        {{ message.label }}
      </div>

      <transition name="q-transition--fade">
        <div
          class="absolute-right row items-center"
          v-if="message.condition && props.open"
        >
          <q-btn
            flat
            size="12px"
            padding="2px"
            color="primary"
            icon="more_vert"
            class="rounded"
          >
            <q-menu
              v-model="menu"
              @update:model-value="$emit('menu', menu)"
              class="bott-portal-menu"
            >
              <q-list dense>
                <q-item
                  clickable
                  v-for="(button, index) of buttons"
                  :key="index"
                >
                  <q-item-section avatar>
                    <q-icon
                      :name="button.icon"
                      :color="button.color"
                      size="22px"
                    />
                  </q-item-section>

                  <q-item-section>{{ button.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </transition>
    </div>

    <q-card
      flat
      bordered
      class="my-card q-pa-xs rounded"
      v-if="message.condition"
    >
      <div class="ellipsis-3-lines text-caption word-break-all">
        {{ message.data.text }}
      </div>
    </q-card>

    <div class="" v-else>
      <div class="text-caption text-center q-pb-lg">Пока нет...</div>

      <div class="row justify-center">
        <q-btn
          flat
          padding="4px"
          size="11px"
          color="primary"
          icon="add_circle"
          class="rounded col-6"
        >
          <q-tooltip
            class="bott-tooltip text-center"
            anchor="top middle"
            self="bottom middle"
          >
            Добавить
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { defaultMessage } from '../../../scenarios/messages/stores/deafults';

const props = withDefaults(defineProps<MessageCardProps>(), {
  open: false,
  message: () => {
    return { data: defaultMessage, label: '', condition: false };
  },
});

const menu = ref(false);

const buttons = computed(() => [
  {
    label: 'Изменить',
    icon: 'edit',
    color: 'primary',
    action: '',
  },
  {
    label: 'Удалить',
    icon: 'close',
    color: 'red',
    action: '',
  },
]);

interface MessageCardProps {
  open: boolean;
  message: { data: MessageFree; label: string; condition: boolean };
}
</script>

<style scoped lang="scss">
.word-break-all {
  word-break: break-all;
}
</style>
