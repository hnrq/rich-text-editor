import {createEditor, Editor, Node, Transforms} from 'slate';
import * as utils from '.';
import {LeafProps} from '../components/Leaf';

const setupInitialValue = (
  text: string,
  format?: keyof LeafProps['leaf'],
): Node => {
  const node: Node = {
    type: 'paragraph',
    children: [{text}],
  }

  if (format) node.children[0][format] = true;
  return node;
};

describe('Util', () => {
  describe('isFormatActive', () => {
    it('Returns true if the format is active', () => {
      const editor = createEditor();
      const initialText = 'Hello, World';
      const format = 'bold';
      editor.insertNode(setupInitialValue(initialText, format));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: initialText.length,
        },
      });

      expect(utils.isFormatActive(editor, format)).toBe(true);
    });

    it('Returns false if the format is inactive', () => {
      const editor = createEditor();
      const initialText = 'Hello, World';
      const format = 'bold';
      editor.insertNode(setupInitialValue(initialText, format));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: initialText.length,
        },
      });

      expect(utils.isFormatActive(editor, 'italic')).toBe(false);
    });
  });

  describe('toggleFormat', () => {
    it("Removes an inline format if it's present", () => {
      const editor = createEditor();
      const initialText = 'Hello, World';
      const format = 'bold';
      editor.insertNode(setupInitialValue(initialText));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: initialText.length,
        },
      });
      utils.toggleFormat(editor, format);

      const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
      });

      expect(match[0]).toEqual({[format]: true, text: initialText});
    });

    it("Adds an inline format if it's not present", () => {
      const editor = createEditor();
      const initialText = 'Hello, World';
      const format = 'bold';
      editor.insertNode(setupInitialValue(initialText, format));
      Transforms.select(editor, {
        anchor: {
          path: [0, 0],
          offset: 0,
        },
        focus: {
          path: [0, 0],
          offset: initialText.length,
        },
      });
      utils.toggleFormat(editor, format);

      const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
      });

      expect(match).toBeUndefined();
    });
  });
});
