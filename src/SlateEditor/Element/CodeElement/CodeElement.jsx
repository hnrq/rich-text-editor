import React from 'react';
import Prism from 'prismjs';
import { type Element } from 'slate';

const decorate = (codeBlock: Element) => {
  const grammar = Prism.languages['javascript'];
  const tokens = Prism.tokenize(codeBlock, grammar);
  const decorations = [];

  texts.forEach((text) => {

  });
}

type Props = {
  attributes: Attributes,
  children: React$Element<any>,
  element: ElementType
};


export const CodeElement = ({ children }: Props) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export default CodeElement;