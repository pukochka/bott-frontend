<template>
  <div class="row q-gutter-sm">
    <q-card
      bordered
      flat
      class="column rounded overflow-hidden col"
      v-for="[name, values] of Object.entries(setting)"
      :key="name"
      @wheel="handleWheel($event, <TimeNames>name)"
    >
      <transition name="q-transition--fade">
        <div v-if="values.focus" class="bg-primary-opacity absolute-full"></div>
      </transition>

      <q-input
        borderless
        :mask="'##'"
        fill-mask="00"
        :suffix="values.letter"
        :input-class="['text-primary text-center ' + name + '-input']"
        class="text-h6 q-pr-sm bott-input-suffix"
        v-model="values.value"
        @update:model-value="val => updateInput(val, <TimeNames>name)"
        @focus="handleFocus(<TimeNames>name)"
        @blur="values.focus = false"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { parseTimestamp } from '../../../../../../utils/helpers/time';
import { setCaretPosition } from '../../../../../../utils/helpers/string';

const props = withDefaults(defineProps<TimeSliderProps>(), {
  value: 1,
});

const emit = defineEmits<{
  (e: 'update', value: number): void;
}>();

const handleFocus = (name: TimeNames) => {
  const section = setting.value[name];

  section.focus = true;

  if (section.max < 10) {
    setCaretPosition('.' + name + '-input', 1, 2);
  }
};

const updateTimestamp = () => {
  const timestamp = Object.entries(setting.value)
    .map(([name, value]) => value.time(setting.value[<TimeNames>name].value))
    .reduce((acc, rec) => acc + rec, 0);

  emit('update', timestamp);
};

const handleWheel = (ev: WheelEvent, name: TimeNames) => {
  const section = setting.value[name];
  const value = Number(section.value);
  const newValue = value + (ev.deltaY > 0 ? -1 : 1);

  if (newValue > section.max || newValue < 0) {
    const diff = section.max < 10 ? '0' + section.max : section.max + '';

    section.value = newValue > section.max ? '00' : diff;

    updateTimestamp();
    return;
  }

  section.value = newValue < 10 ? '0' + newValue : newValue + '';

  updateTimestamp();
};

const updateInput = (value: string | number, name: TimeNames) => {
  value = Number(value);
  const section = setting.value[name];

  section.value = value > section.max ? '0' + section.max : '' + value;

  updateTimestamp();
};

const setting = ref<Record<TimeNames, TimeSetting>>({
  days: {
    focus: false,
    letter: 'д',
    value: '00',
    max: 9,
    time: (val) => Number(val) * 60 * 60 * 24,
  },
  hours: {
    focus: false,
    letter: 'ч',
    value: '00',
    max: 23,
    time: (val) => Number(val) * 60 * 60,
  },
  minutes: {
    focus: false,
    letter: 'м',
    value: '00',
    max: 59,
    time: (val) => Number(val) * 60,
  },
  seconds: {
    focus: false,
    letter: 'с',
    value: '01',
    max: 59,
    time: (val) => Number(val) % 60,
  },
});

type TimeNames = 'seconds' | 'minutes' | 'hours' | 'days';

const setTime = () => {
  let correctMap = parseTimestamp(props.value);

  if (Array.isArray(correctMap)) correctMap = correctMap.reverse().slice(1);

  Object.entries(setting.value).forEach(([_, value], index) => {
    const time = correctMap[index];

    if (time === false) {
      value.value = '00';
    } else {
      const num = Number(time.slice(0, 2));

      value.value = num < 10 ? '0' + num : '' + num;
    }
  });
};

watch(() => props.value, setTime);
onMounted(setTime);

interface TimeSetting {
  value: string;
  max: number;
  letter: string;
  focus: boolean;
  time: (val: string) => number;
}

interface TimeSliderProps {
  value: number;
}
</script>

<style scoped lang="scss">
.bg-primary-opacity {
  background: rgba(25, 118, 210, 0.18);
}
</style>
