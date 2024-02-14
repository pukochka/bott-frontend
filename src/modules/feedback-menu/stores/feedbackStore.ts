import { defineStore } from 'pinia';
import {
  defaultFeedback,
  DialogsNames,
  FeedbackModels,
  MenuNames,
  MessageFeedbackItemPreview,
} from './feedbackModels';
import { Link } from '../utils/lines/link';
import { defaultMessageFree } from '../../inline/stores/inlineModels';
import { Point } from 'paper';
import { update } from '../utils/create';
import { fetchFeedbackAnswer, fetchFeedbackIntegrations } from '../api/queries';
import { config } from '../config';

export const useFeedbackStore = defineStore('paper-feedback', {
  state: () =>
    ({
      view: null,
      layer: null,
      first: null,

      _message: null,
      answers: [],
      answersCount: {
        all: 0,
        unfinished: 0,
        unread: 0,
        visible: 3,
      },
      notifications: [],
      _feedback: defaultFeedback,

      connect: [],
      shells: [],
      loading: true,

      mobile: {
        start: false,
        setting: false,
        end: false,
        connect: false,
      },

      dragging: false,
      onmessage: false,
      onconnection: false,
      connecting: false,
      clickable: false,
      notopen: false,
      linking: false,

      dialogs: {
        setting: false,
        answer: false,
        notify: false,
        message: false,
        message_free: false,
        crossroad: false,
        touch: false,
        api: false,
        api_edit: false,
        administrator_answer: false,
      },

      countIntegrations: 0,
      indexIntegrations: [],
      accessIntegrations: [],
      selectedIntegration: null,

      selectedType: 1,
      selectedMessage: null,
      selectedOption: null,
      selectedMessageFree: null,
      selectedAnswer: null,

      menu: { create: false, link: false, message: false, touch: false },
      action: null,

      cursor: new Point(0, 0),
    } as unknown as FeedbackModels),
  getters: {
    isMove: (state) => state.dragging || state.connecting,
    isMobile: () =>
      /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
        navigator.userAgent.toLowerCase()
      ),
    alignCount: (state) => state._feedback.inputs.length,
    message: (state): MessageFree => state._message ?? defaultMessageFree,
    feedback: (state): MessageFeedback<MessageFeedbackItemPreview> =>
      state._feedback ?? defaultFeedback,

    crossroadConnections: (state) => {
      const cross = state._feedback.inputs
        .filter((item) => item.crossroad)
        .map((item) => item.crossroad?.options ?? [])
        .flat()
        .map((item) => {
          return [item?.next.id, item.next.type];
        });

      return Object.fromEntries(cross);
    },
  },
  actions: {
    openDialog(name: DialogsNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogsNames) {
      this.dialogs[name] = false;
    },
    hideMenu() {
      Object.keys(this.menu).forEach(
        (name) => (this.menu[<MenuNames>name] = false)
      );
    },

    mountLink() {
      this.feedback.inputs.forEach((item) => {
        const end = this.feedback.inputs.find(
          (inp) => inp.id === item.next?.id && inp.type === item.next.type
        );

        if (!item.next && item.type === 4) {
          const inputs = Object.fromEntries(
            this.feedback.inputs.map((opt) => {
              return [opt.id, opt];
            })
          );

          const platforms = <MessageFeedbackItemPreview[]>(
            item.crossroad?.options
              .map((opt) => {
                return { id: opt.next.id, type: opt.next.type };
              })
              .map((cross) => {
                if (inputs[cross.id]?.type === cross.type)
                  return inputs[cross.id];
              })
          );

          platforms.forEach((platform) => {
            const options = <[number, MessageFeedbackCrossroadOption][]>(
              this.feedback.inputs
                .map((item) =>
                  item.crossroad?.options.map((opt) => {
                    return [opt.next.id, opt];
                  })
                )
                .flat()
                .filter((i) => i)
            );

            const option = Object.fromEntries(options)[platform.id];

            const link = new Link(
              item.platform,
              platform.platform,
              item,
              platform,
              option
            );

            this.connect.push({
              link: [item.id, platform.id],
              group: link,
            });

            this.layer.insertChild(0, link.group);
          });
        }

        if (item.next && end) {
          const link = new Link(item.platform, end.platform, item, end);

          this.connect.push({
            link: [item.id, end.id],
            group: link,
          });

          this.layer.insertChild(0, link.group);
        }
      });
    },
    dragMessage(message: any) {
      const connect = this.connect
        .map((item: any) => {
          if (item.link.includes(message.id)) return item;
        })
        .filter((item) => item);

      connect.forEach((item) => item.group.move(message));
    },
    openMenu(name: MenuNames, action?: () => void, touch?: boolean) {
      if (action !== void 0) this.action = action;

      this.menu[name] = true;

      if (touch) {
        this.openDialog('touch');

        return;
      }
    },

    updateQuestion() {
      const message = this.feedback.inputs.filter(
        (item) =>
          item.id === this.selectedMessage?.id &&
          item.type === this.selectedMessage?.type
      );

      if (message[0] !== void 0) {
        this.selectedMessage = message[0];
      }
    },

    updateFeedback(response: any) {
      this._feedback = response.feedback;
      this.selectedMessage = null;
      this.selectedMessageNext = null;

      update();
    },

    updateIntegrations() {
      return Promise.all([
        fetchFeedbackIntegrations('index', { message_id: config.message_id }),
        fetchFeedbackIntegrations('access', { message_id: config.message_id }),
        fetchFeedbackIntegrations('count', { message_id: config.message_id }),
      ]);
    },

    updateAnswers(action?: () => void) {
      return Promise.all([
        fetchFeedbackAnswer('index'),
        fetchFeedbackAnswer(
          'count',
          undefined,
          (response) => (this.answersCount.all = response)
        ),
        fetchFeedbackAnswer(
          'count',
          { status: 0 },
          (response) => (this.answersCount.unfinished = response)
        ),
        fetchFeedbackAnswer(
          'count',
          { status: 1 },
          (response) => (this.answersCount.unread = response)
        ),
      ]).then(() => {
        if (action !== void 0) action();
      });
    },
  },
});
