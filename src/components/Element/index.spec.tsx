import Element from '.';
import { render } from '@testing-library/react';
import faker from 'faker';

describe('<Element />', () => {
  it('renders a paragraph by default', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{}}>{text}</Element>);
    expect(getByTestId('paragraph')).toHaveTextContent(text);
  });

  it('renders a block quote when element.type is equal to block-quote', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'block-quote'}}>{text}</Element>);
    expect(getByTestId('block-quote')).toHaveTextContent(text);
  });

  it('renders a bulleted list when element.type is equal to bulleted-list', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'bulleted-list'}}>{text}</Element>);
    expect(getByTestId('bulleted-list')).toHaveTextContent(text);
  });

  it('renders a heading one when element.type is equal to heading-one', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'heading-one'}}>{text}</Element>);
    expect(getByTestId('heading-one')).toHaveTextContent(text);
  });

  it('renders a heading two when element.type is equal to heading-two', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'heading-two'}}>{text}</Element>);
    expect(getByTestId('heading-two')).toHaveTextContent(text);
  });

  it('renders a list item when element.type is equal to list-item', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'list-item'}}>{text}</Element>);
    expect(getByTestId('list-item')).toHaveTextContent(text);
  });

  it('renders a numbered list when element.type is equal to numbered-list', () => {
    const text = faker.random.words(4);
    const { getByTestId } = render(<Element element={{type: 'numbered-list'}}>{text}</Element>);
    expect(getByTestId('numbered-list')).toHaveTextContent(text);
  });
});