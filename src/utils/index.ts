import {Editor, Transforms, Text} from 'slate';
import { LeafProps } from '../components/Leaf';
import {EditorType} from '../containers/Editor';

export const isFormatActive = (editor: EditorType, format: keyof LeafProps['leaf']): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

export const toggleFormat = (editor: EditorType, format: keyof LeafProps['leaf']): void => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    {[format]: isActive ? null : true},
    {match: Text.isText, split: true},
  );
};
