import { defineStore } from 'pinia';
import { PSStoreModel, defaultFeedback, defaultInput } from './PSmodels';
import { Group } from 'paper';
import { Link } from '../utils/links';

export const usePSStore = defineStore('paper-store', {
  state: () =>
    ({
      view: null,
      layer: null,

      links: null,
      messages: null,

      feedback: defaultFeedback,

      connect: [],

      dragging: false,
      onmessage: false,
      onconnection: false,
      connecting: false,
      clickable: false,
    } as unknown as PSStoreModel),
  getters: {
    alignCount: (state) => state.feedback.inputs.length + 1,
  },
  actions: {
    mountLayers() {
      this.links = new Group();
      this.messages = new Group();

      this.layer.insertChild(0, this.links);
      this.layer.insertChild(1, this.messages);
    },
    mountLink() {
      this.feedback.flow.forEach((flow) => {
        const [start, end] = this.findLinks(flow);

        const link = new Link(start.platform, end.platform);

        this.connect.push({
          link: [start.id, end.id],
          group: link,
        });

        this.links.addChild(link.group);
      });
    },
    findLinks(flow: MessageFeedbackFlow): MessageFeedbackItem[] {
      return this.feedback.inputs.filter((input) =>
        flow.link.includes(input.id)
      );
    },
    dragMessage(message: any) {
      const connect = this.connect
        .map((item: any) => {
          if (item.link.includes(message.id)) return item;
        })
        .filter((item) => item);

      connect.forEach((item) => item.group.move());
    },
  },
});
