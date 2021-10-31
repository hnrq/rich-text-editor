import Element from '.';
import { render } from '@testing-library/react';

describe('<Element />', () => {
  it('renders a paragraph by default', () => {
    const { getByTestId } = render(<Element element={{}}>Test</Element>);
    expect(getByTestId('paragraph')).toHaveTextContent('Test');
  });

  it('renders a block quote when element.type is equal to block-quote', () => {
    const { getByTestId } = render(<Element element={{type: 'block-quote'}}>Test</Element>);
    expect(getByTestId('block-quote')).toHaveTextContent('Test');
  });

  it('renders a bulleted list when element.type is equal to bulleted-list', () => {
    const { getByTestId } = render(<Element element={{type: 'bulleted-list'}}>Test</Element>);
    expect(getByTestId('bulleted-list')).toHaveTextContent('Test');
  });

  it('renders a heading one when element.type is equal to heading-one', () => {
    const { getByTestId } = render(<Element element={{type: 'heading-one'}}>Test</Element>);
    expect(getByTestId('heading-one')).toHaveTextContent('Test');
  });

  it('renders a heading two when element.type is equal to heading-two', () => {
    const { getByTestId } = render(<Element element={{type: 'heading-two'}}>Test</Element>);
    expect(getByTestId('heading-two')).toHaveTextContent('Test');
  });

  it('renders a list item when element.type is equal to list-item', () => {
    const { getByTestId } = render(<Element element={{type: 'list-item'}}>Test</Element>);
    expect(getByTestId('list-item')).toHaveTextContent('Test');
  });

  it('renders a numbered list when element.type is equal to numbered-list', () => {
    const { getByTestId } = render(<Element element={{type: 'numbered-list'}}>Test</Element>);
    expect(getByTestId('numbered-list')).toBeInTheDocument();
  });
});