import React, { useEffect, useRef } from 'react';
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  convertToRaw
} from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnect, setEditorState } from 'actions';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import classNames from 'classnames';
import createLinkPlugin from 'draft-js-anchor-plugin';
import plugins from './plugins';
import Toolbar from './Toolbar';
import decorators from './decorator';
import BlockStyleControls from './StyleControls/BlockStyleControls';
import InlineStyleControls from './StyleControls/InlineStyleControls';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import toolbarStyles from './toolbarStyles.module.scss';
import './Editor.scss';

type Props = {
  classList: Array<string> | string,
  readOnly: Boolean
};

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter an URL...'
});
const { LinkButton } = linkPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { toolbarStyles }
});
const { InlineToolbar } = inlineToolbarPlugin;

const DraftEditor = ({ readOnly, classList }: Props) => {
  const editorState = useSelector((state) => state.editorReducer);
  const dispatch = useDispatch();
  const editorRef = useRef();

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'code-block':
        return 'language-javascript';
      default:
        return null;
    }
  };

  const toggleInlineStyle = (style) => {
    dispatch(setEditorState(RichUtils.toggleInlineStyle(editorState, style)));
  };

  useEffect(() => {
    dispatch(wsConnect('/'));
  }, [dispatch]);

  const keyBinding = (e) => {
    if (e.keyCode === 13 && e.shiftKey) return 'soft-break';
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    if (e.key === 'Tab' && block.getType() === 'code-block') return 'code-tab';
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (command === 'code-block') {
      dispatch(setEditorState(RichUtils.toggleBlockType(state, 'code-block')));
      return 'handled';
    }
    if (command === 'soft-break') {
      dispatch(setEditorState(RichUtils.insertSoftNewline(editorState)));
      return 'handled';
    }
    if (command === 'code-tab') {
      const currentState = editorState;
      const newBlockState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        '\t'
      );

      dispatch(
        setEditorState(
          EditorState.push(currentState, newBlockState, 'insert-characters')
        )
      );
    }
    if (newState) {
      dispatch(setEditorState(newState));
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleBlockType = (type) => {
    dispatch(setEditorState(RichUtils.toggleBlockType(editorState, type)));
  };

  const handleChange = (newEditorState) => {
    const selection = newEditorState.getSelection();
    const block = newEditorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();
    if (
      block.getType() === 'code-block' &&
      !newContent.equals(currentContent)
    ) {
      const data = block.getData().merge({ language: 'javascript' });
      const newBlock = block.merge({ data });
      const newContentState = newEditorState.getCurrentContent().merge({
        blockMap: newEditorState
          .getCurrentContent()
          .getBlockMap()
          .set(selection.getStartKey(), newBlock),
        selectionAfter: selection
      });
      dispatch(
        setEditorState(
          EditorState.push(newEditorState, newContentState, 'change-block-data')
        )
      );
    } else dispatch(setEditorState(newEditorState));
  };

  return (
    <div
      tabIndex={0}
      className={classNames('editor', classList)}
      onClick={() => editorRef.current.focus()}
      role="textbox"
      onKeyDown={() => {}}
    >
      {!readOnly && (
        <Toolbar>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log(convertToRaw(editorState.getCurrentContent()));
            }}
          >
            Convert to Raw JS
          </button>
        </Toolbar>
      )}
      <Editor
        editorState={editorState}
        plugins={[...plugins, inlineToolbarPlugin, linkPlugin]}
        ref={editorRef}
        readOnly={readOnly}
        decorators={decorators}
        onChange={handleChange}
        keyBindingFn={keyBinding}
        blockStyleFn={getBlockStyle}
        handleKeyCommand={handleKeyCommand}
      />
      {!readOnly && (
        <InlineToolbar>
          {(externalProps) => (
            <div className="inline-toolbar-draft d-flex flex-nowrap">
              <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
                {...externalProps}
              />
              <LinkButton
                {...externalProps}
                theme={{
                  button: 'btn btn-link style-button',
                  active: 'btn-active'
                }}
              />
            </div>
          )}
        </InlineToolbar>
      )}
    </div>
  );
};

export default DraftEditor;
