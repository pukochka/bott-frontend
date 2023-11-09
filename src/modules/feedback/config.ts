const config = {
  host: 'https://bott/api/',
  feedback_id: 11,
  bot: {
    id: 6,
    user_id: 1,
    name: 'TEST_USERNAME',
    token: '5229498662:AAH6wu0z-uButJQfzT5jAUfjzROfNUTLDGk',
    type: 7,
    status: 1,
    paid_date: '2030-01-01',
    title: 'TEST_NAME',
    model_id: 1,
    notice_new_user: 1,
    notice_new_deal: 1,
    created_at: '2022-11-30',
    hello_id: 144,
    tariff_id: 4,
    language_id: 1,
    default_menu_id: 2,
    error_id: 2,
    currency_id: 1,
    payment_id: 2,
    profile_id: 3,
    time_zone: 1,
    recurrent_check_id: null,
    is_free: null,
  },
  message_id: 166,

  limits: {
    /** Маскимальный размер файла */
    maxSizeFile: 1e7,
    /** Минимальный размер файла */
    minSizeFile: 1 / 10,
    /** Максимальная длина текста в вопросе */
    maxInputLength: 512,
    /** Минимальная длина текста в вопросе */
    minInputLength: 1,
    /** Максимальная длина регулярного выражения */
    maxValidatorLength: 512,
    /** Минимальная длина регулярного выражения */
    minValidatorLength: 4,
    /** Максимальное количество вопросов */
    maxQuestionCount: 8,
    /** Максимальное количество ответов */
    maxQuizCount: 10,
  },

  text: {
    empty_questions: 'Пока вопросов нет',
    empty_quiz_item: 'Ответов пока нет',
    danger_input: 'Введено неверное количество символов',
  },

  questions: [
    {
      label: 'Ответ с сообщением',
      description:
        'Пользователю нужно будет ответить на сообщение. Сообщение будет проверено, при выборе вида проверки, в случае ошибки выведет текст который Вы введете.',
      id: 1,
    },

    {
      label: 'Ответ с файлом',
      description:
        'Пользователю нужно будет прислать файл, установленного расширения и размера.',
      id: 2,
    },

    {
      label: 'Опрос пользователя',
      description: 'Пользователю нужно будет выбрать подходящий ответ.',
      id: 3,
    },
  ],
};

export default config;
