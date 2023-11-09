<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <q-card
      flat
      bordered
      class="column justify-between fit rounded overflow-hidden"
    >
      <div class="">
        <q-banner
          inline-actions
          dense
          class="bg-primary text-white text-subtitle1"
          v-ripple="{ color: 'white' }"
        >
          <template v-slot:avatar>
            <q-icon name="chat_bubble" color="white" />
          </template>

          <div class="">Вопрос №{{ number }}</div>

          <template v-slot:action>
            <q-btn
              v-if="not_first"
              :loading="loading.up"
              class="rounded"
              flat
              padding="4px"
              color="white"
              icon="chevron_left"
              @click="moveQuestion('up')"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Сделать {{ question.sort - 1 }}-м вопросом
              </q-tooltip>
            </q-btn>

            <q-btn
              v-if="not_last"
              :loading="loading.down"
              class="rounded"
              flat
              padding="4px"
              color="white"
              icon="chevron_right"
              @click="moveQuestion('down')"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Сделать {{ question.sort + 1 }}-м вопросом
              </q-tooltip>
            </q-btn>

            <q-btn
              v-if="!is_sm"
              class="rounded"
              flat
              padding="4px"
              color="red"
              icon="close"
              @click="deleteQuestion"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                Удалить вопрос
              </q-tooltip>
            </q-btn>
          </template>
        </q-banner>

        <q-card-section class="full-width q-pt-none q-px-sm">
          <div class="q-gutter-y-sm">
            <div
              class="text-h6 text-primary text-weight-bold text-center q-py-sm"
            >
              {{ questionTitle }}
            </div>

            <div>
              <div class="q-gutter-y-sm">
                <div class="row no-wrap items-center rounded-container-grey">
                  <div class="q-pa-sm">
                    <div class="text-subtitle1">Текст вопроса</div>
                    <div
                      class="rounded bg-blue-2 q-py-xs q-px-sm ellipsis-3-lines"
                    >
                      {{ question.text }}
                    </div>
                  </div>

                  <q-space />
                </div>

                <component :is="sectionComponent" :data="question.data" />
              </div>
            </div>
          </div>
        </q-card-section>
      </div>

      <div class="row q-pa-sm">
        <q-btn
          class="col-12 rounded"
          flat
          size="md"
          color="primary"
          label="Изменить вопрос"
          @click="openSettings"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { fetchFeedback } from '../../api/feedback';

import { defaultQuestion } from '../../stores/FBModels';

import { useFBStore } from '../../stores/FBStore';
import { useQuasar } from 'quasar';

import FileSections from './sections/FileSection.vue';
import QuizSections from './sections/QuizSection.vue';
import SimpleSections from './sections/SimpleSection.vue';

const props = withDefaults(defineProps<QuestionItemProps>(), {
  question: () => defaultQuestion,
  number: 0,
});

const main = useFBStore();
const quasar = useQuasar();

const openSettings = () => {
  main.selectedQuestion = props.question;
  main.openDialog('question_view');
};

const is_sm = computed(() => quasar.screen.lt.sm);

const questionTitle = computed(() => setting[props.question.type]?.title ?? '');

const sectionComponent = computed(
  () => setting[props.question.type]?.component
);

const setting = {
  1: { title: 'Сообщение', component: SimpleSections },
  2: { title: 'Сообщение с файлом', component: FileSections },
  3: { title: 'Опрос', component: QuizSections },
};

const not_first = computed(() => props.question.sort !== 1);
const not_last = computed(() => props.question.sort !== main.questions.length);

const loading = ref({
  up: false,
  down: false,
});

const moveQuestion = (side: 'up' | 'down') => {
  loading.value[side] = true;
  fetchFeedback(`sort-${side}`, { sort: props.question.sort }).then(() => {
    loading.value[side] = false;
  });
};

const deleteQuestion = () => {
  console.log(1);
  // main.openNotify( {
  //   message: 'Вы уверены, что хотите удалить вопрос?',
  //   type: 'sure',
  //   data: {
  //     type: props.question.type,
  //     id: props.question.id,
  //   },
  // } );
};

interface QuestionItemProps {
  question: FBQuestion;
  number: number;
}
</script>

<style lang="scss" scoped></style>
