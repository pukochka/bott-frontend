<template>
  <timer-card
    v-if="timer"
    scenarios
    :message="props.message"
    @open-inline-menu="handleOpen"
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
import { useDataStore } from '../../../stores/data/dataStore';
import { useStatesStore } from '../../../stores/states/statesStore';

import TimerCard from 'src/components/timer/TimerCard.vue';
import AssignedMedia from 'src/components/file-manager/AssignedMedia.vue';

const { changeAlpha } = colors;

const props = withDefaults(defineProps<MessageMainProps>(), {
  message: () => defaultMessage,
});

const vector = useVectorStore();
const data = useDataStore();
const states = useStatesStore();

const timer = computed(() => props.message.type.id === 7);
const feedback = computed(() => props.message.type.id === 2);

const color = computed(() =>
  changeAlpha(props.message.color?.color ?? '#ffffff', 0.3)
);

const handleOpen = () => {
  data.selectedMessage = props.message;

  states.openDialog('edit_message');
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
