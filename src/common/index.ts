export const MARKS = ['bold', 'code', 'italic', 'underline'] as const;
export const LISTS = ['list-item', 'numbered-list', 'bulleted-list'] as const;
export const BLOCKS = [
  'heading-one',
  'heading-two',
  'block-quote',
  'paragraph',
  ...LISTS,
] as const;
