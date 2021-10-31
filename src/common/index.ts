export const MARKS = ['bold', 'code', 'italic', 'underline'] as const;
export const LISTS = ['list-item', 'numbered-list'] as const;
export const BLOCKS = [
  ...LISTS,
  'block-quote',
  'bulleted-list',
  'heading-one',
  'heading-two',
  'paragraph',
] as const;
