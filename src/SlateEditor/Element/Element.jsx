import React, { Attributes } from 'react';
import { ImageElement } from './ImageElement/';
import type { Element as ElementType } from 'slate';

type Props = {
  attributes: Attributes,
  children: React$Element<any>,
  element: ElementType
};

export default function Element(props: Props) {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'emoji':
      return <span {...attributes}>{element.emoji}</span>
    case 'anchor':
      return <a {...attributes} href={element.url}>{children}</a>;
    case 'image':
      return <ImageElement {...props} />;
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
