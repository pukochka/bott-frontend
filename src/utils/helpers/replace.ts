const RETags = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/gi;

const resolvedTags =
  'i|strong|strike|bold|italic|em|u|ins|a|code|pre|del'.split('|');

const solvableTagsRE = new RegExp(
  resolvedTags.map((tag) => `(<${tag}[^>]+>|<${tag}>|<\/${tag}>)`).join('|'),
  'ig'
);

export const replaceUnsolvableTags = (value?: string | null) =>
  (value || '').replace(RETags, (tag) =>
    tag.match(solvableTagsRE)?.length ? tag : tag.replace(RETags, '')
  );

export function encodeText(text: string) {
  return text
    .replace(/(<\/p>)(?!.*\1)/, '')
    .replace(/<\/p><\/blockquote>/gi, '</blockquote>\n')
    .replace(/<br class="ProseMirror-trailingBreak">/, '')
    .replace(/<p><\/p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p>/gi, '');
}
