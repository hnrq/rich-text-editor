import { convertToRaw } from 'draft-js';

export const wsConnect = (host) => ({ type: 'WS_CONNECT', host });
export const wsConnecting = (host) => ({ type: 'WS_CONNECTING', host });
export const wsConnected = (host) => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = (host) => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = (host) => ({ type: 'WS_DISCONNECTED', host });
export const newMessage = (text) => ({
  type: 'NEW_MESSAGE',
  payload: text
});

export const setEditorStateSuccess = (editorState) => ({
  type: 'SET_EDITOR_STATE',
  payload: editorState
});

export const setEditorState = (editorState) => (dispatch, getState) => {
  const currentContent = getState().editorReducer.getCurrentContent();
  const newContent = editorState.getCurrentContent();

  if (!newContent.equals(currentContent)) {
    dispatch(newMessage(convertToRaw(newContent)));
  }
  dispatch(setEditorStateSuccess(editorState));
};

export const setEditorText = (text) => ({
  type: 'SET_EDITOR_TEXT',
  payload: text
});
