import {createEditor, Editor, Node, Transforms} from 'slate';
import {ReactEditor, withReact} from 'slate-react';
import faker from 'faker';

import * as utils from '.';
import {BlockEnum, ListEnum, MarkEnum} from 'common/types';
import {CustomElement} from 'containers/Editor';
import {BLOCKS, LISTS, MARKS} from 'common';

const setupInitialValue = (text: string, mark?: MarkEnum): Node => {
  const node: Node = {
    type: 'paragraph',
    children: [{text}],
  };

  if (mark) node.children[0][mark] = true;
  return node;
};

describe('Util', () => {
  describe('isMarkActive', () => {
    it('Returns true if the mark is active', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const mark = faker.random.arrayElement(MARKS);
      editor.insertNode(setupInitialValue(text, mark));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: text.length,
        },
      });

      expect(utils.isMarkActive(editor, mark)).toBe(true);
    });

    it('Returns false if the mark is inactive', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const [mark, differentMark] = faker.random.arrayElements(MARKS, 2);
      editor.insertNode(setupInitialValue(text, mark));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: text.length,
        },
      });

      expect(utils.isMarkActive(editor, differentMark)).toBe(false);
    });
  });

  describe('toggleMark', () => {
    it('Removes the mark if present', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const mark = faker.random.arrayElement(MARKS);
      editor.insertNode(setupInitialValue(text));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: text.length,
        },
      });
      let marks = Editor.marks(editor);
      expect(marks?.[mark]).toBe(undefined);
      utils.toggleMark(editor, mark);
      marks = Editor.marks(editor);
      expect(marks?.[mark]).toBe(true);
    });

    it('Adds the mark if not present', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const mark = faker.random.arrayElement(MARKS);
      editor.insertNode(setupInitialValue(text, mark));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: text.length,
        },
      });
      let marks = Editor.marks(editor);
      expect(marks?.[mark]).toBe(true);
      utils.toggleMark(editor, mark);
      marks = Editor.marks(editor);
      expect(marks?.[mark]).toBe(undefined);
    });
  });

  describe('isBlockActive', () => {
    it('returns true if current node has the given block style', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const type: BlockEnum = faker.random.arrayElement(BLOCKS);
      editor.insertNode({type, children: [{text}]});

      expect(utils.isBlockActive(editor, type)).toBe(true);
    });

    it('returns false if current node does not have the given block style', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const [type, differentType]: BlockEnum[] = faker.random.arrayElements(
        BLOCKS.filter(block => block !== 'paragraph'),
        2,
      );
      editor.insertNode({type, children: [{text}]});
      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });

      expect(utils.isBlockActive(editor, differentType)).toBe(false);
    });
  });

  describe('toggleBlock', () => {
    it('Removes block styling if present', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const type: BlockEnum = faker.random.arrayElement(
        BLOCKS.filter(
          block => block !== 'paragraph' && !LISTS.includes(block as ListEnum),
        ),
      );
      editor.insertNode({type, children: [{text}]});
      utils.toggleBlock(editor, type);
      expect((editor.children[0] as CustomElement).type).toBe('paragraph');
    });

    it('Adds block styling if present', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const type: BlockEnum = faker.random.arrayElement(BLOCKS);
      editor.insertNode({type: 'paragraph', children: [{text}]});
      expect((editor.children[0] as CustomElement).type).toBe('paragraph');
      utils.toggleBlock(editor, type);
      expect((editor.children[0] as CustomElement).type).toBe(type);
    });

    it('Adds list-item styling if a list style is provided', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const type: BlockEnum = faker.random.arrayElement(LISTS);
      editor.insertNode({type: 'paragraph', children: [{text}]});
      expect((editor.children[0] as CustomElement).type).toBe('paragraph');
      utils.toggleBlock(editor, type);
      expect((editor.children[0] as CustomElement).type).toBe(type);
    });
  });

  describe('isSelected', () => {
    it('Returns true if ReactEditor is focused and there is text selected', () => {
      const editor = withReact(createEditor());
      const text = faker.random.word();
      jest.spyOn(ReactEditor, 'isFocused').mockReturnValue(true);
      Transforms.insertNodes(editor, [
        {
          type: 'paragraph',
          children: [{text}],
        },
      ]);

      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });
    });
    it('Returns false if ReactEditor is not focused', () => {
      const editor = withReact(createEditor());
      const text = faker.random.word();
      jest.spyOn(ReactEditor, 'isFocused').mockReturnValue(false);
      Transforms.insertNodes(editor, [
        {
          type: 'paragraph',
          children: [{text}],
        },
      ]);

      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });
    });
    it('Returns false if selection is collapsed', () => {
      const editor = withReact(createEditor());
      const text = faker.random.word();
      jest.spyOn(ReactEditor, 'isFocused').mockReturnValue(true);
      Transforms.insertNodes(editor, [
        {
          type: 'paragraph',
          children: [{text}],
        },
      ]);

      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });

      Transforms.collapse(editor);
    });
  });
});
