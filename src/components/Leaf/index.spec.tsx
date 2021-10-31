import {render} from '@testing-library/react';
import Leaf from '.';

describe('<Leaf />', () => {
  it('renders correctly', () => {
    const {container} = render(<Leaf leaf={{}} />);
    expect(container).toBeInTheDocument();
  });

  it('Returns bold text when leaf.bold equals true', () => {
    const {getByTestId} = render(<Leaf leaf={{bold: true}}>Test</Leaf>);
    expect(getByTestId('bold-leaf')).toHaveTextContent('Test');
  });

  it('Returns italic text when leaf.italic equals true', () => {
    const {getByTestId} = render(<Leaf leaf={{italic: true}}>Test</Leaf>);
    expect(getByTestId('italic-leaf')).toHaveTextContent('Test');
  });

  it('Returns code text when leaf.code equals true', () => {
    const {getByTestId} = render(<Leaf leaf={{code: true}}>Test</Leaf>);
    expect(getByTestId('code-leaf')).toHaveTextContent('Test');
  });

  it('Returns underlined text when leaf.underline equals true', () => {
    const {getByTestId} = render(<Leaf leaf={{underline: true}}>Test</Leaf>);
    expect(getByTestId('underline-leaf')).toHaveTextContent('Test');
  });

  it('can return a leaf with more than one decoration', () => {
    const {getByTestId} = render(
      <Leaf leaf={{underline: true, code: true}}>Test</Leaf>,
    );
    expect(getByTestId('underline-leaf')).toBeInTheDocument();
    expect(getByTestId('code-leaf')).toBeInTheDocument();
  });
});
