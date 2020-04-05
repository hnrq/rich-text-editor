import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Text, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { 
  toggleFormat, 
  toggleBlock, 
  withRich
} from 'utils/slateUtils';
import { execAll } from 'utils';
import { withHistory } from 'slate-history';
import './TextEditor.scss';
import {
  FaHeading,
  FaListOl,
  FaListUl,
  FaCode,
  FaQuoteRight,
  FaFileImage
} from 'react-icons/fa';
import linkifyIt from 'linkify-it';
import handleKeyDown from './handleKeyDown';
import InlineToolbar from './InlineToolbar';
import { HASHTAG_REGEX } from 'utils/regex';
import Toolbar from './Toolbar';
import { BlockButton, ImageButton } from './Button';
import { Element } from './Element';
import { Leaf } from './Leaf';

type Props = {
  /** If the Editor is readOnly */
  readOnly: Boolean,
  /** List of CSS classes */
  classList: string | Array<string>
};

const linkify = linkifyIt();
Transforms.deselect = () => {};

const Editor = ({ readOnly, classList }: Props) => {
  const editor = useMemo(
    () => withRich(withHistory(withReact(createEditor()))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editorValue, setEditorValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);

  const decorate = useCallback(([node, path]) => {
    const ranges = [];
    if (Text.isText(node)) {
      const { text } = node;
      if (text) {
        (linkify.match(text) || []).forEach(({ index, lastIndex }) => {
            ranges.push({
              anchor: { path, offset: lastIndex },
              focus: { path, offset: index },
              link: true
            });
          });
        execAll(text, HASHTAG_REGEX).forEach(({ index, lastIndex }) => {
          ranges.push({
            anchor: { path, offset: lastIndex },
            focus: { path, offset: index },
            'hashtag': true
          });
        });
      }    
    }
    return ranges;
  }, []);

  return (
    <Slate
      editor={editor}
      value={editorValue}
      onChange={(value) => setEditorValue(value)}
    >
      <InlineToolbar />
      <Toolbar>
        <BlockButton format="heading-one">
          <FaHeading />
        </BlockButton>
        <BlockButton format="heading-two">
          <FaHeading />
          <sub>2</sub>
        </BlockButton>
        <BlockButton format="code-block">
          <FaCode />
        </BlockButton>
        <BlockButton format="block-quote">
          <FaQuoteRight />
        </BlockButton>
        <BlockButton format="numbered-list">
          <FaListOl />
        </BlockButton>
        <BlockButton format="bulleted-list">
          <FaListUl />
        </BlockButton>
        <ImageButton><FaFileImage /></ImageButton>
      </Toolbar>
      <Editable
        placeholder="Well, hello there!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
        decorate={decorate}
        onDOMBeforeInput={(event) => {
          switch (event.inputType) {
            case 'formatBold':
              return toggleFormat(editor, 'bold');
            case 'formatItalic':
              return toggleFormat(editor, 'italic');
            case 'formatUnderline':
              return toggleFormat(editor, 'underline');
            case 'formatLink':
              return toggleBlock(editor, 'link');
            default:
              return null;
          }
        }}
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    </Slate>
  );
};

export default Editor;
