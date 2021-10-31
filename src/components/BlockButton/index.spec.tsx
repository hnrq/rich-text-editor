import {fireEvent, render} from '@testing-library/react';
import faker from 'faker';
import {ThemeProvider} from 'styled-components';
import {useSlate} from 'slate-react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faListOl,
  faListUl,
  faHeading,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';

import {BLOCKS} from 'common';
import {BlockEnum} from 'common/types';
import theme from 'theme';
import {isBlockActive, toggleBlock} from 'utils';

import BlockButton from '.';

library.add(faListOl, faListUl, faHeading, faQuoteLeft);

jest.mock('slate-react', () => ({
  useSlate: jest.fn(),
}));

jest.mock('utils', () => ({
  isBlockActive: jest.fn(),
  toggleBlock: jest.fn(),
}));

const renderBlockButton = (
  children?: string,
  format: BlockEnum = BLOCKS[0],
  icon?: BlockEnum,
) =>
  render(
    <ThemeProvider theme={theme}>
      <BlockButton format={format} icon={icon}>
        {children}
      </BlockButton>
    </ThemeProvider>,
  );

describe('<BlockButton />', () => {
  it('renders a button', () => {
    const {getByRole} = renderBlockButton();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('renders a button with the correct children', () => {
    const children = faker.random.word();
    const {getByText} = renderBlockButton(children);
    expect(getByText(children)).toBeInTheDocument();
  });

  it('renders a button with color=primary when its format is active', () => {
    (isBlockActive as jest.Mock).mockReturnValue(true);
    const children = faker.random.word();
    const {getByText} = renderBlockButton(children);

    expect(getByText(children)).toHaveStyle({color: theme.colors.primary});
  });

  it('calls `toggleBlock` when clicked', () => {
    (useSlate as jest.Mock).mockReturnValue({});
    const format = faker.random.arrayElement(BLOCKS);
    const {getByTestId} = renderBlockButton(faker.random.word(), format);

    fireEvent.mouseDown(getByTestId('block-button'));

    expect(toggleBlock).toHaveBeenCalledWith({}, format);
  });

  it('renders an icon if provided', () => {
    (useSlate as jest.Mock).mockReturnValue({});
    const format = faker.random.arrayElement(BLOCKS);
    const {getByTestId} = renderBlockButton(
      faker.random.word(),
      format,
      format,
    );

    expect(getByTestId('mark-icon')).toBeInTheDocument();
  });
});
