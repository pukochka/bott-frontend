export interface FBStore {
  questions: FBQuestion[];
  setting: FBSetting | null;
  dialogs: {
    create_question: boolean;
    edit_quiz_item: boolean;
    question_view: boolean;
  };
  selectedQuestion: FBQuestion | null;
  selectedQuiz: FBQuiz | null;
  loading: boolean;
}

export type DialogNames =
  | 'create_question'
  | 'question_view'
  | 'edit_quiz_item';

export const defaultMessage: FBMessage = {
  setting: null,
  items: [],
};

export const defaultQuestion: FBQuestion = {
  id: 0,
  data: {
    validator: '',
    message: '',
  },
  feedback_id: 0,
  type: 1,
  text: '',
  sort: 0,
  confirm: false,
};

export const defaultQuiz: FBQuiz = {
  id: 0,
  sort: 0,
  text: '',
};

export const defaultSimpleQuestion: FBSimpleQuestion = {
  validator: '',
  message: '',
};

export const defaultFileQuestion: FBFileQuestion = {
  extensions: '',
  size: 0,
};

export const defaultQuizQuestion: FBQuizQuestion = {
  is_multiple: false,
  options: [],
};
