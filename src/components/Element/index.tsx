import { FC } from 'react';
import { BlockEnum } from 'common/types';

interface ElementProps {
  attributes?: {[key: string]: string};
  element: {
    type?: BlockEnum;
  }
}

const Element: FC<ElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote data-testid="block-quote" {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul data-testid="bulleted-list" {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 data-testid="heading-one" {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 data-testid="heading-two" {...attributes}>{children}</h2>
    case 'list-item':
      return <li data-testid="list-item" {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol data-testid="numbered-list" {...attributes}>{children}</ol>
    default:
      return <p data-testid="paragraph" {...attributes}>{children}</p>
  }
}

export default Element;