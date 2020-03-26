import { Editor, Transforms } from 'slate';
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
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'anchor' });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'anchor' });
};

export const wrapLink = (editor, url) => {
  const link = {
    type: 'anchor',
    url,
    children: []
  };
  Transforms.wrapNodes(editor, link, { split: true });
};

export const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;
  const editorWithLinks = editor;

  editorWithLinks.isInline = (el) => (el.type === 'anchor' ? true : isInline(el));

  editorWithLinks.insertText = (text) => {
    if (text && isUrl(text)) wrapLink(editorWithLinks, text);
    else insertText(text);
  };

  editorWithLinks.insertData = (data) => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) wrapLink(editorWithLinks, text);
    else insertData(data);
  };

  return editorWithLinks;
};

export const wrapDecoration = (text, path, regExp, decoratorKey) => {
  const ranges = [];
  let match;
  while ((match = regExp.exec(text)) !== null)
    ranges.push({
      anchor: { path, offset: regExp.lastIndex },
      focus: { path, offset: match.index },
      [decoratorKey]: true
    });
  return ranges;
};
