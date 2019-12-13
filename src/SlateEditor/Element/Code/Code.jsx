import React from 'react';
import './prism.css';

type Props = {
  /** JSX to be rendered inside the block */
  children: React$Element<any>
}

const Code = ({ children, attributes }: Props) => {

  return (
    <pre className="line-numbers" {...attributes}>
      <code className="language-js">
        {children}
      </code>
    </pre>
  );  
};

export default Code;