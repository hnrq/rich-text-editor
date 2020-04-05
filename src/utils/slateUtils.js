import { Editor, Transforms } from 'slate';
import imageExtensions from 'image-extensions';
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

export const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

export const withRich = (editor) => {
  const { 
    insertData, 
    isVoid, 
    isInline,
    insertText
  } = editor;
  editor.isVoid = (element) => element.type === 'image' || element.type === 'mention' ? true : isVoid(element);
  editor.isInline = (element) => element.type === 'mention' || element.type === 'anchor' ? true : isInline(element)

  editor.insertText = (text) => {
    if (text && isUrl(text)) wrapLink(editor, text);
    else insertText(text);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;
    
    if (text && isUrl(text)) wrapLink(editor, text);
    else insertData(data);

    if (files && files.length > 0)
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          });
          reader.readAsDataURL(file);
        }
      }
    else if (isImageUrl(text)) insertImage(editor, text);
    else insertData(data);
  }

  return editor;
}

export const insertMention = (editor, character) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}
