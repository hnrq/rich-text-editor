import {render} from '@testing-library/react';
import faker from 'faker';
import Leaf from '.';

describe('<Leaf />', () => {
  it('renders correctly', () => {
    const {container} = render(<Leaf leaf={{}} />);
    expect(container).toBeInTheDocument();
  });

  it('Returns bold text when leaf.bold equals true', () => {
    const text = faker.random.word();
    const {getByTestId} = render(<Leaf leaf={{bold: true}}>{text}</Leaf>);
    expect(getByTestId('bold-leaf')).toHaveTextContent(text);
  });

  it('Returns italic text when leaf.italic equals true', () => {
    const text = faker.random.word();
    const {getByTestId} = render(<Leaf leaf={{italic: true}}>{text}</Leaf>);
    expect(getByTestId('italic-leaf')).toHaveTextContent(text);
  });

  it('Returns code text when leaf.code equals true', () => {
    const text = faker.random.word();
    const {getByTestId} = render(<Leaf leaf={{code: true}}>{text}</Leaf>);
    expect(getByTestId('code-leaf')).toHaveTextContent(text);
  });

  it('Returns underlined text when leaf.underline equals true', () => {
    const text = faker.random.word();
    const {getByTestId} = render(<Leaf leaf={{underline: true}}>{text}</Leaf>);
    expect(getByTestId('underline-leaf')).toHaveTextContent(text);
  });

  it('can return a leaf with more than one decoration', () => {
    const text = faker.random.word();
    const {getByTestId} = render(
      <Leaf leaf={{underline: true, code: true}}>{text}</Leaf>,
    );
    expect(getByTestId('underline-leaf')).toBeInTheDocument();
    expect(getByTestId('code-leaf')).toBeInTheDocument();
  });
});
