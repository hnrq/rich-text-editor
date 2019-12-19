// @flow

import React from 'react';
import classNames from 'classnames';
import type { EditorState } from 'draft-js';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode
} from 'react-icons/fa';
import StyleButton from './StyleButton';

type Props = {
  /** DraftJS editor state */
  editorState: EditorState,
  /** Function to be called on toggle */
  onToggle: Function, 
  /** Array or string with CSS classes */
  classList: Array<string> | string
}

const INLINE_STYLES = [
  { label: <FaBold />, style: 'BOLD' },
  { label: <FaItalic />, style: 'ITALIC' },
  { label: <FaUnderline />, style: 'UNDERLINE' },
  { label: <FaCode />, style: 'CODE' }
];

const InlineStyleControls = ({ editorState, onToggle, classList }: Props) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className={classNames(classList)}>
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          active={currentStyle.has(type.style)}
          key={type.style}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;