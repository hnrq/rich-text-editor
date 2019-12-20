import React, { useEffect } from 'react';
import { useSlate } from 'slate-react';
import { highlightAll } from 'prismjs';
import './prism.css';

type Props = {
  /** JSX to be rendered inside the block */
  children: React$Element<any>,
  /** Slate Element attributes */
  attributes: Attributes
}

const Code = ({ children, attributes }: Props) => (
  <pre className="line-numbers" {...attributes}>
    <code className="language-js">
      {children}
    </code>
  </pre>
);  

export default Code;