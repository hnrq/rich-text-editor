import React from 'react';
import { Image } from './Image';

export const renderBlock = (props, next) => {
  const { node, attributes, children } = props;
  switch (node.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'heading': {
      const Heading = `h${node.data.get('level') || '2'}`;
      return <Heading {...attributes}>{children}</Heading>;
    }
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'image':
      return <Image {...props} />;
    case 'list':
      return (
        <ul {...attributes}>
          <li>{children}</li>
        </ul>
      );
      case 'list_item':
            return <li {...attributes}>{children}</li>;
    case 'code_block': 
     return (
      <pre>
        <code {...attributes}>{children}</code>
      </pre>
     );
    default:
      return next();
  }
};