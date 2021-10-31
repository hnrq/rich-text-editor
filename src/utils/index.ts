import {Editor, Transforms, Element} from 'slate';
import {MarkEnum, BlockEnum, ListEnum} from 'common/types';
import {EditorType} from 'common/types';

export const LIST_TYPES: Array<ListEnum> = ['list-item', 'numbered-list'];

export const isMarkActive = (editor: EditorType, format: MarkEnum): boolean => {
  const marks = (Editor.marks(editor) as unknown) as {[key: string]: boolean};
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: EditorType, format: MarkEnum): void => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: EditorType, format: BlockEnum): boolean => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  })

  return !!match
}

export const toggleBlock = (editor: EditorType, format: BlockEnum): void => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format as ListEnum);

  Transforms.unwrapNodes(editor, {
    match: node =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      LIST_TYPES.includes(node.type as ListEnum),
    split: true,
  });
  const newProperties: Partial<Element> = {
    type: (isActive ? 'paragraph' : isList ? 'list-item' : format),
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block);
  }
};