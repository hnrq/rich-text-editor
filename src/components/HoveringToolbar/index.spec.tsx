import {fireEvent, render} from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import {createEditor, Editor, Node} from 'slate';
import slateReact, {ReactEditor, withReact} from 'slate-react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faUnderline,
  faBold,
  faItalic,
  faCode,
  fas,
} from '@fortawesome/free-solid-svg-icons';

import * as utils from 'utils';
import theme from 'theme';

import HoveringToolbar from '.';
import {ThemeProvider} from 'styled-components';

jest.mock('slate-react', () => ({
  // eslint-disable @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('slate-react'),
  useSlate: jest.fn(),
}));

library.add(fas, faUnderline, faBold, faItalic, faCode);

const renderHoveringToolbar = (text: string) =>
  render(
    <ThemeProvider theme={theme}>
      <HoveringToolbar />
      <p>{text}</p>
    </ThemeProvider>,
  );

const setupEditor = (
  text?: string,
): {editor: ReactEditor; initialValue: Node} => {
  const editor = withReact(createEditor() as ReactEditor);
  const initialValue = {type: 'paragraph', children: [{text}]};
  Editor.insertNode(editor, initialValue);

  return {editor, initialValue};
};

describe('<HoveringToolbar />', () => {
  it('renders when a text is selected', async () => {
    const text = faker.random.word();
    const {editor} = setupEditor(text);
    (slateReact.useSlate as jest.Mock).mockReturnValue(editor);
    jest.spyOn(utils, 'isSelected').mockReturnValue(true);
    const {getByTestId, getByText} = renderHoveringToolbar(text);

    fireEvent.select(getByText(text), {
      target: {selectionStart: 0, selectionEnd: text.length},
    });

    expect(getByTestId('hovering-toolbar')).toBeInTheDocument();
  });

  it('does not render when no text is selected', async () => {
    const text = faker.random.word();
    const {editor} = setupEditor(text);
    (slateReact.useSlate as jest.Mock).mockReturnValue(editor);
    jest.spyOn(utils, 'isSelected').mockReturnValue(false);
    const {queryByTestId, getByText} = renderHoveringToolbar(text);

    fireEvent.select(getByText(text), {
      target: {selectionStart: 0, selectionEnd: text.length},
    });

    expect(queryByTestId('hovering-toolbar')).not.toBeInTheDocument();
  });
});
