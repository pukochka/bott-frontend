import { defineStore } from 'pinia';
import { DialogNames, FBStore } from './FBModels';

export const useFBStore = defineStore('main', {
  state: () =>
    ({
      questions: q,
      setting: null,
      dialogs: {
        create_question: false,
        edit_quiz_item: false,
        question_view: false,
      },
      selectedQuiz: null,
      selectedQuestion: null,
      loading: true,
    } as FBStore),
  getters: {},
  actions: {
    openDialog(name: DialogNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogNames) {
      this.dialogs[name] = false;
    },
  },
});

const q = [
  {
    id: 170,
    text: 'Оперативная и не только в этот момент я думаю что я буду очень долго ждать тебя и знать тебя как я люблю и люблю когда ты рядом со мною и не важно кто тебя любит ты просто нужен и кто тебе дорог тебе нужен и ты не случаются и ты будешь рядом со своими мыслями о себе в этот мир так и быть другим человеком и не случаются себя в этот мир так хочу с ним как то так и быть с тобой и так же не хочу тебя обидеть меня никто никогда и никогда тебя ни как говорится не в этот раз не в тебя и в этот момент не случаются ',
    confirm: true,
    sort: 1,
    feedback_id: 10689,
    type: 2,
    data: {
      size: 5690000,
      extensions: 'xls, xlsx, tif, gif',
    },
  },
  {
    id: 20313,
    text: 'Как твои дела?',
    confirm: false,
    sort: 2,
    feedback_id: 10689,
    type: 1,
    data: {
      validator: '',
      message: '',
    },
  },
  {
    id: 3474,
    text: 'Выберите ответ',
    confirm: false,
    sort: 3,
    feedback_id: 10689,
    type: 3,
    data: {
      is_multiple: false,
      options: [
        {
          id: 5141,
          text: '18888',
          sort: 0,
        },
      ],
    },
  },
];
