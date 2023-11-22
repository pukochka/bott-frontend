import { defineStore } from 'pinia';
import { PSStoreModel, defaultFeedback } from './PSmodels';
import { Crossroad, Link } from '../utils/links';

export const usePSStore = defineStore('paper-store', {
  state: () =>
    ({
      view: null,
      layer: null,

      feedback: defaultFeedback,

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
    } as unknown as PSStoreModel),
  getters: {
    alignCount: (state) => state.feedback.inputs.length,
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

          const platforms = item.crossroad?.options
            .map((opt) => {
              return { id: opt.next.id, type: opt.next.type };
            })
            .map((cross) => {
              if (inputs[cross.id]?.type === cross.type)
                return inputs[cross.id];
            });


          const crossroad = new Crossroad(
            item.platform,
            ...platforms.map((cross) => cross?.platform)
          );

          const ids = (platforms ?? []).map((item: any) => item.id);

          this.connect.push({
            link: [item.id, ...ids],
            group: crossroad,
          });

          this.layer.insertChild(0, crossroad.group);
        }

        if (item.next && end) {
          const link = new Link(item.platform, end.platform);

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
