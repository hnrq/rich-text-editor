import React, { useState, useEffect, useRef } from 'react';
import { 
  EditorState, 
  RichUtils, 
  getDefaultKeyBinding
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import classNames from 'classnames';
import createLinkPlugin from 'draft-js-anchor-plugin';
import plugins from './plugins';
import Toolbar from './Toolbar';
import BlockStyleControls from './StyleControls/BlockStyleControls';
import InlineStyleControls from './StyleControls/InlineStyleControls';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import './Editor.scss';

type Props = {
  classList: Array<string> | string,
  readOnly: Boolean
}

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter an URL...',
});
const { LinkButton } = linkPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const DraftEditor = ({ readOnly, classList }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef();

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'code-block': return 'language-javascript';
      default: return null;
    }
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  useEffect(() => {
    const selection = editorState.getSelection();
    const block = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey());
    if (block.getType() === "code-block") {
      const data = block.getData().merge({ language: 'javascript' });
      const newBlock = block.merge({ data });
      const newContentState = editorState.getCurrentContent().merge({
        blockMap: editorState
                  .getCurrentContent()
                  .getBlockMap()
                  .set(selection.getStartKey(), newBlock),
        selectionAfter: selection
      });
      setEditorState(EditorState.push(editorState, newContentState, "change-block-data"));
    }
  }, [editorState]);

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
    <div 
      tabIndex={0} 
      className={classNames("editor", classList)} 
      onClick={() => editorRef.current.focus()}
      role="textbox"
      onKeyDown={() => editorRef.current.focus()}
    >
      <Toolbar>
        <BlockStyleControls 
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </Toolbar>
      <Editor 
        editorState={editorState}
        plugins={[...plugins, inlineToolbarPlugin, linkPlugin]}
        ref={editorRef}
        onChange={setEditorState} 
        keyBindingFn={keyBinding}
        blockStyleFn={getBlockStyle}
        handleKeyCommand={handleKeyCommand}
      />
      <InlineToolbar>
        {
          (externalProps) => (
            <div className="inline-toolbar">
              <InlineStyleControls 
                editorState={editorState}
                onToggle={toggleInlineStyle}
                {...externalProps}
              />
            </div>
          )
        }
      </InlineToolbar>
    </div>
  );
};

export default DraftEditor;