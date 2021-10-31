import {createEditor, Editor, Node, Transforms} from 'slate';
import {BlockEnum, MarkEnum} from 'common/types';
import {CustomElement} from 'containers/Editor';
import faker from 'faker';

import * as utils from '.';
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
      const marks = faker.random.arrayElements(MARKS, 2);
      editor.insertNode(setupInitialValue(text, marks[0]));
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

      expect(utils.isMarkActive(editor, marks[1])).toBe(false);
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
      const type: BlockEnum = faker.random.arrayElement(BLOCKS);
      editor.insertNode({type: 'paragraph', children: [{text}]});

      expect(utils.isBlockActive(editor, type)).toBe(false);
    });
  });

  describe('toggleBlock', () => {
    it('Removes block styling if present', () => {
      const editor = createEditor();
      const text = faker.random.words(3);
      const type: BlockEnum = faker.random.arrayElement(BLOCKS);
      editor.insertNode({type, children: [{text}]});
      expect((editor.children[0] as CustomElement).type).toBe(type);
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
});
