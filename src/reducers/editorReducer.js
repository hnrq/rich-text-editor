import { EditorState } from 'draft-js';

const initialState = EditorState.createEmpty();

export const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDITOR_STATE':
      return action.payload;
    case 'SET_EDITOR_TEXT':
      return EditorState.createWithContent(action.payload);
    default:
      return state;
  }
};

export default editorReducer;
