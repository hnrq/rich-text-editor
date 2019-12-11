import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, getDefaultKeyBinding, AtomicBlockUtils } from "draft-js";
import classNames from 'classnames';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import MediaControls from './MediaControls';
import { mediaBlockRenderer } from './MediaBlockRenderer';
import 'draft-js/dist/Draft.css';
import './TextEditor.scss';

type Props = {
  classList?: string | Array<string>,
  readOnly?: boolean
}

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const TextEditor = ({ classList, readOnly }:Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleKey = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return null;
    }
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const confirmMedia = (urlValue, urlType) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };

  const focusEditor = () => editorRef.current.focus();

  React.useEffect(() => {
    focusEditor();
  }, []);

  return (
    <>
      <div className={classNames(classList, 'text-editor')}>
        {!readOnly && (
        <div className="controls d-flex">
          <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
          <MediaControls confirmMedia={confirmMedia} />
        </div>
        )}
        <div onClick={focusEditor} onKeyDown={focusEditor}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            readOnly={readOnly}
            handleKeyCommand={handleKey}
            editorState={editorState}
            onChange={state => setEditorState(state)}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            keyBindingFn={mapKeyToEditorCommand}
            ref={editorRef}
            />
        </div>
      </div>

      <button onClick={() => console.log(convertToRaw(editorState.getCurrentContent()).blocks)}>
        Get raw text
      </button>
    </>
  );
};

TextEditor.defaultProps = {
  classList: '',
  readOnly: false
};

export default TextEditor;