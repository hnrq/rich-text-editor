import React from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon, CodeIcon } from 'icons';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { icon: <BoldIcon />, label: "Bold", style: "BOLD" },
  { icon: <ItalicIcon />, label: "Italic", style: "ITALIC" },
  { icon: <UnderlineIcon />, label: "Underline", style: "UNDERLINE" },
  { icon: <CodeIcon />, label: "Monospace", style: "CODE" }
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="editor-controls text-white d-flex flex-column">
      <div className="d-flex ">
      {INLINE_STYLES.map(({ label, style, icon }) => (
        <StyleButton
          key={label}
          active={currentStyle.has(style)}
          label={icon || label}
          onToggle={onToggle}
          style={style}
        />
      ))}
      </div>
    </div>
  );
};

export default InlineStyleControls;