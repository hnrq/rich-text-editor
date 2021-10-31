import {fireEvent, render} from '@testing-library/react';
import faker from 'faker';
import {ThemeProvider} from 'styled-components';
import {useSlate} from 'slate-react';

import {MARKS} from 'common';
import {MarkEnum} from 'common/types';
import theme from 'theme';
import {isMarkActive, toggleMark} from 'utils';

import MarkButton from '.';

const renderMarkButton = (children?: string, format: MarkEnum = MARKS[0]) =>
  render(
    <ThemeProvider theme={theme}>
      <MarkButton format={format}>{children}</MarkButton>
    </ThemeProvider>,
  );

jest.mock('slate-react', () => ({
  useSlate: jest.fn(),
}));

jest.mock('utils', () => ({
  isMarkActive: jest.fn(),
  toggleMark: jest.fn(),
}));

describe('<MarkButton />', () => {
  it('renders a button', () => {
    const {getByRole} = renderMarkButton();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('renders a button with the correct children', () => {
    const children = faker.random.word();
    const {getByText} = renderMarkButton(children);
    expect(getByText(children)).toBeInTheDocument();
  });

  it('renders a button with color=foreground when its format is active', () => {
    (isMarkActive as jest.Mock).mockReturnValue(true);
    const children = faker.random.word();
    const {getByText} = renderMarkButton(children);

    expect(getByText(children)).toHaveStyle({color: theme.colors.foreground});
  });

  it('calls `toggleMark` when clicked', () => {
    (useSlate as jest.Mock).mockReturnValue({});
    const format = faker.random.arrayElement(MARKS);

    const {getByTestId} = renderMarkButton(faker.random.word(), format);
    fireEvent.mouseDown(getByTestId('mark-button'));

    expect(toggleMark).toHaveBeenCalledWith({}, format);
  });
});
