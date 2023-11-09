import { Mark, mergeAttributes } from '@tiptap/core';

export const CodeMark = Mark.create({
  name: 'CodeMark',
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  parseHTML() {
    return [
      {
        tag: 'code',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'code',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addCommands() {
    return {
      toggleCodeMark:
        () =>
        ({ commands }: any) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
