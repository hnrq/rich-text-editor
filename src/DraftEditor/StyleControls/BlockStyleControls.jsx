import React from 'react';
import classNames from 'classnames';
import type { EditorState } from 'draft-js';
import { 
  FaHeading, 
  FaListOl, 
  FaListUl, 
  FaCode,
  FaQuoteRight 
} from "react-icons/fa";
import StyleButton from './StyleButton';

type Props = {
  /** DraftJS editor state */
  editorState: EditorState,
  /** Function to be called on toggle */
  onToggle: Function, 
  /** Array or string with CSS classes */
  classList: Array<string> | string
}

const BLOCK_TYPES = [
  { label: <><FaHeading /><strong><sub>1</sub></strong></>, style: 'header-one' },
  { label: <><FaHeading /><strong><sub>2</sub></strong></>, style: 'header-two' },
  { label: <><FaHeading /><strong><sub>3</sub></strong></>, style: 'header-three' },
  { label: <><FaHeading /><strong><sub>4</sub></strong></>, style: 'header-four' },
  { label: <><FaHeading /><strong><sub>5</sub></strong></>, style: 'header-five' },
  { label: <><FaHeading /><strong><sub>6</sub></strong></>, style: 'header-six' },
  { label: <FaQuoteRight />, style: 'blockquote' },
  { label: <FaListUl />, style: 'unordered-list-item' },
  { label: <FaListOl />, style: 'ordered-list-item' },
  { label: <FaCode />, style: 'code-block' },
];

const BlockStyleControls = ({ editorState, onToggle, classList }: Props) => {
  const selection = editorState.getSelection();
  const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

  return (
    <div className={classNames(classList)}>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;