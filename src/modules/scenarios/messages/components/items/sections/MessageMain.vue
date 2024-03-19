<template>
  <timer-card
    v-if="timer"
    :combined="false"
    :message="props.message"
    @update-time="updateTime"
  ></timer-card>

  <div class="rounded bordered overflow-hidden" v-if="!timer && !feedback">
    <assigned-media scenarios :message="props.message"></assigned-media>

    <div
      class="q-px-sm q-py-xs"
      :style="{ 'min-height': '29px', background: color }"
    >
      <div class="bott-title__params">
        <div
          class="ellipsis-3-lines bott-message--content"
          v-html="props.message.text"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated } from 'vue';
import { colors } from 'quasar';

import { defaultMessage } from 'src/utils/helpers/defaults';

import { useVectorStore } from '../../../stores/vector/vectorStore';
import fetchMessage from '../../../api/queries/message';

import TimerCard from 'src/components/timer/TimerCard.vue';
import AssignedMedia from 'src/components/file-manager/AssignedMedia.vue';

const { changeAlpha } = colors;

const props = withDefaults(defineProps<MessageMainProps>(), {
  message: () => defaultMessage,
});

const vector = useVectorStore();

const timer = computed(() => props.message.type.id === 7);
const feedback = computed(() => props.message.type.id === 2);

const color = computed(() =>
  changeAlpha(props.message.color?.color ?? '#ffffff', 0.3)
);

const updateTime = (value: number, callback?: () => void) => {
  const message = props.message;

  fetchMessage(
    'update-text',
    {
      message_id: props.message.id,
      text: value.toString(),
    },
    (response) => {
      message.text = response.data.data;
    }
  ).then(() => {
    if (callback !== void 0) callback();
  });
};

interface MessageMainProps {
  message: MessageFree;
}

onUpdated(vector.update);
</script>

<style lang="scss" scoped>
.bott-message--content {
  white-space: pre-wrap;
  line-height: 16px;
}
</style>
