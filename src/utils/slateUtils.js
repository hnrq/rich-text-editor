import { Editor, Transforms, Range } from 'slate';
import { LAST_EMOJI_REGEX } from 'utils/regex';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import emojis from 'utils/emojis';

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

export const getCurrentWord = (editor, range, punctuation = '_') => {
  const wordBefore = Editor.before(editor, range, { unit: 'word' });
  const before = wordBefore && Editor.before(editor, wordBefore);
  const beforeRange = before && Editor.range(editor, before, range);
  const beforeText = beforeRange && Editor.string(editor, beforeRange);
  return beforeText?.charAt(0) === punctuation ? getCurrentWord(editor, beforeRange) : { text: beforeText, range: beforeRange };
}

export const withEmojis = (editor) => {
  const { isInline, isVoid, insertText } = editor;
  editor.isInline = (element) => element.type === 'emoji' ? true : isInline(element);
  editor.isVoid = (element) => element.type === 'emoji' ? true : isVoid(element);
  editor.insertText = (text) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = getCurrentWord(editor, start);
      const emojiMatch = LAST_EMOJI_REGEX.exec(wordBefore.text);
      if (emojiMatch) insertEmoji(editor, emojiMatch[1]);
    }
    insertText(text);
  }
  return editor;
}

export const getTokenLength = (token) => {
  if (typeof token === 'string') return token.length;
  else if (typeof token.content === 'string') return token.content.length;
  else return token.content.reduce((l, t) => l + getTokenLength(t), 0);
};

export const insertEmoji = (editor, emojiKey, selection) => {
  if (emojis[emojiKey]) {
    const { emoji } = emojis[emojiKey];
    const node = { type: 'emoji', emoji, children: [{ text: emojiKey }] };
    Transforms.select(editor, selection);
    Transforms.insertNodes(editor, node);
    Transforms.move(editor);
  }
}

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

export const withAnchors = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => element.type === 'anchor' ? true : isInline(element);

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
}

export const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => element.type === 'image' ? true : isVoid(element);

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (text && isUrl(text)) wrapLink(editor, text);

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
