import React, { useState } from 'react';
import { 
  EditorState, 
  RichUtils, 
  getDefaultKeyBinding
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import PrismDecorator from 'draft-js-prism';
import classNames from 'classnames';
import decorator from './decorator';
import plugins from './plugins';
import Toolbar from './Toolbar';
import BlockStyleControls from './BlockStyleControls';
import './Editor.scss';

type Props = {
  classList: Array<string> | string,
  readOnly: Boolean
}

const DraftEditor = ({ readOnly, classList }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'code-block': return 'language-javascript';
      default: return null;
    }
  };

  const keyBinding = (e) => {
    if (e.keyCode === 13 && e.shiftKey) return 'soft-break';
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (command === 'code-block') {
      RichUtils.setEditorState(RichUtils.toggleBlockType(state, 'code-block'));
      return 'handled';
    }
    if (command === 'soft-break') {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = (type) => setEditorState(RichUtils.toggleBlockType(editorState, type));

  return (
    <div className={classNames("editor", classList)}>
      <Toolbar>
        <BlockStyleControls 
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </Toolbar>
      <Editor 
        editorState={editorState}
        plugins={plugins} 
        onChange={setEditorState} 
        keyBindingFn={keyBinding}
        blockStyleFn={getBlockStyle}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default DraftEditor;