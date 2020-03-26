import React, { Attributes } from 'react';
import type { Element as ElementType } from 'slate';

type Props = {
  attributes: Attributes,
  children: React$Element<any>,
  element: ElementType
};

export default function Element({ attributes, children, element }: Props) {
  switch (element.type) {
    case 'anchor':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
}
