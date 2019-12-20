import { Editor } from "slate";
import isUrl from 'is-url';

export const TEXT_FORMATS = ["bold", "italic", "underlined", "code"];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const BLOCK_FORMATS = [
  ...LIST_TYPES,
  "heading-one",
  "heading-two",
  "block-quote",
  "code-block"
];

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underlined",
  "mod+`": "code"
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => node.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const withRichText = (editor) => {
  const { exec, insertText } = editor;

  editor.insertText = (text) => {
    if (isUrl(text)) return console.log('Link!');
    return insertText(text);
  };

  editor.exec = (command) => {
    if (command.type === 'format_block') {
      const { format } = command;
      const isActive = isBlockActive(editor, format);
      const isList = LIST_TYPES.includes(format);

      LIST_TYPES.forEach((f) => Editor.unwrapNodes(editor, { match: { type: f }, split: true }));

      Editor.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      });

      if (!isActive && isList) {
        Editor.wrapNodes(editor, { type: format, children: [] });
      }
    } else {
      exec(command);
    }
  };

  return editor;
};