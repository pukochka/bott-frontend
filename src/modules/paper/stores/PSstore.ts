import { defineStore } from 'pinia';
import {
  defaultFeedback,
  FeedbackModels,
  MessageFeedbackItemPreview,
  PaperGroup,
} from './Feedbackmodels';
import { Crossroad, Link } from '../utils/links';
import { defaultMessageFree } from '../../inline-menu/stores/inlineModels';

export const usePSStore = defineStore('paper-store', {
  state: () =>
    ({
      view: null,
      layer: null,

      _message: null,
      _feedback: defaultFeedback,

      connect: [],

      dragging: false,
      onmessage: false,
      onconnection: false,
      connecting: false,
      clickable: false,

      dialogs: {
        setting: false,
      },

      position: { visible: false, action: null },
    } as unknown as FeedbackModels),
  getters: {
    alignCount: (state) => state._feedback.inputs.length,
    message: (state): MessageFree => state._message ?? defaultMessageFree,
    feedback: (state): MessageFeedback<MessageFeedbackItemPreview> =>
      state._feedback ?? defaultFeedback,
  },
  actions: {
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

          const crosses = <PaperGroup[]>(
            (platforms ?? [])
              .map((cross) => cross?.platform)
              .filter((item) => item !== void 0)
          );

          const messages = platforms.concat(item);

          const crossroad = new Crossroad(messages, item, ...crosses);

          const ids = (platforms ?? []).map((item: any) => item.id);

          this.connect.push({
            link: [item.id, ...ids],
            group: crossroad,
          });

          this.layer.insertChild(0, crossroad.group);
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
    openMenu(action?: () => void) {
      if (action !== void 0) this.position.action = action;
      this.position.visible = true;
    },
  },
});
