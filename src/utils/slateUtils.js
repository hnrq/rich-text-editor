import { Editor, Transforms, Range } from 'slate';
import isUrl from 'is-url';

export const TEXT_FORMATS = ['bold', 'italic', 'underlined', 'code'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const BLOCK_FORMATS = [
  ...LIST_TYPES,
  'heading-one',
  'heading-two',
  'block-quote',
  'code-block'
];

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underlined',
  'mod+`': 'code'
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => node.type === format
  });

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all'
  });
  return !!match;
};

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  if (isMarkActive(editor, format)) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) unwrapLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const insertLink = (editor, url) => {
  if (editor.selection) wrapLink(editor, url);
};

export const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (el) => (el.type === 'link' ? true : isInline(el));

  editor.insertText = (text) => {
    if (text && isUrl(text)) wrapLink(editor, text);
    else insertText(text);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) wrapLink(editor, text);
    else insertData(data);
  };

  return editor;
};
