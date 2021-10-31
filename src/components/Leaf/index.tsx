import {FC} from 'react';

export interface LeafProps {
  attributes?: {[key: string]: unknown};
  leaf: {
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

const Leaf: FC<LeafProps> = ({attributes, children, leaf}) => {
  if (leaf.bold) children = <strong data-testid="bold-leaf">{children}</strong>;
  if (leaf.code) children = <code data-testid="code-leaf">{children}</code>;
  if (leaf.italic) children = <em data-testid="italic-leaf">{children}</em>;
  if (leaf.underline) children = <u data-testid="underline-leaf">{children}</u>;

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
