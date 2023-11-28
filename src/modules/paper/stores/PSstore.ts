import { defineStore } from 'pinia';
import {
  defaultFeedback,
  defaultInput,
  DialogsNames,
  FeedbackModels,
  MenuNames,
  MessageFeedbackItemPreview,
} from './FeedbackModels';
import { Link } from '../utils/lines/link';
import { defaultMessageFree } from '../../inline-menu/stores/inlineModels';

export const usePSStore = defineStore('paper-store', {
  state: () =>
    ({
      view: null,
      layer: null,

      _message: null,
      _feedback: defaultFeedback,

      connect: [],
      shells: [],
      loading: true,

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
      },

      selectedMessage: defaultInput,

      menu: { create: false, link: false },
      action: null,
    } as unknown as FeedbackModels),
  getters: {
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
    openMenu(name: MenuNames, action?: () => void) {
      if (action !== void 0) this.action = action;
      this.menu[name] = true;
    },
    openDialog(name: DialogsNames) {
      this.dialogs[name] = true;
    },
    closeDialog(name: DialogsNames) {
      this.dialogs[name] = false;
    },
  },
});
