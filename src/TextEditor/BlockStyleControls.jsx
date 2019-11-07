import React from 'react';
import { TitleIcon, CodeIcon } from 'icons';
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  { icon: <TitleIcon />, label: "Title", style: "header-two" },
  { icon: <CodeIcon />, label: "Code Block", style: "code_block" }
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="editor-controls text-white d-flex flex-column">
      <div className="d-flex flex-row">
      {BLOCK_TYPES.map(({ label, style, icon }) => (
        <StyleButton
          key={label}
          active={style === blockType}
          label={icon || label}
          onToggle={onToggle}
          style={style}
        />
      ))}
      </div>
    </div>
  );
};

export default BlockStyleControls;