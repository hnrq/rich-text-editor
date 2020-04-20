import React, { Attributes } from 'react';
import { ImageElement } from './ImageElement/';
import type { Element as ElementType } from 'slate';
import isEqual from 'react-fast-compare';

type Props = {
  attributes: Attributes,
  children: React$Element<any>,
  element: ElementType
};

export default React.memo((props: Props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'emoji':
      return <span {...attributes}>{children}{element.emoji}</span>
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
    case 'code-block':
      return <pre className="language-javascript" {...attributes}><code>{children}</code></pre>
    default:
      return <p {...attributes}>{children}</p>;
  }
}, (prevProps, nextProps) => isEqual(prevProps.children, nextProps.children))
