import React, { useState, useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { toggleFormat, toggleBlock } from 'utils/slateUtils';
import { withHistory } from 'slate-history';
import './TextEditor.scss';
import {
  FaHeading,
  FaListOl,
  FaUnderline,
  FaBold,
  FaItalic,
  FaListUl,
  FaCode,
  FaLink,
  FaQuoteRight
} from 'react-icons/fa';
import handleKeyDown from './handleKeyDown';
import InlineToolbar from './InlineToolbar';
import Toolbar from './Toolbar';
import { BlockButton, MarkButton, LinkButton } from './Button';
import { Element } from './Element';
import { Leaf } from './Leaf';

type Props = {
  /** If the Editor is readOnly */
  readOnly: Boolean,
  /** List of CSS classes */
  classList: string | Array<string>
};

const Editor = ({ readOnly, classList }: Props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editorValue, setEditorValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);

  return (
    <Slate
      editor={editor}
      value={editorValue}
      onChange={(value) => setEditorValue(value)}
    >
      <InlineToolbar />
      <Toolbar>
        <MarkButton format="bold">
          <FaBold />
        </MarkButton>
        <MarkButton format="italic">
          <FaItalic />
        </MarkButton>
        <MarkButton format="underlined">
          <FaUnderline />
        </MarkButton>
        <MarkButton format="code">
          <FaCode />
        </MarkButton>
        <LinkButton>
          <FaLink />
        </LinkButton>
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
      </Toolbar>
      <Editable
        placeholder="Well, hello there!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
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
