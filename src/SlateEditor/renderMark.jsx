import React from 'react';

export const renderMark = ({ mark, attributes, children }, next) => {
  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>;
    case 'italic':
      return <i {...attributes}>{children}</i>;
    case 'underline':
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
};