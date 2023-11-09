import { Mark, mergeAttributes } from '@tiptap/core';

export const TGSpoiler = Mark.create({
  name: 'Tgspoiler',
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'tg-spoiler',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addCommands() {
    return {
      toggleTgspoiler:
        () =>
        ({ commands }: any) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
