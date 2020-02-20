import React from 'react';
import type { Leaf as LeafType } from 'slate';

type Props = {
  attributes: Attributes,
  children: React$Element<any>,
  leaf: LeafType
};

const Leaf = ({ attributes, children, leaf }: Props) => {
  let leafChildren = children;
  if (leaf.bold) leafChildren = <strong>{leafChildren}</strong>;
  if (leaf.code) leafChildren = <code>{leafChildren}</code>;
  if (leaf.italic) leafChildren = <em>{leafChildren}</em>;
  if (leaf.underlined) leafChildren = <u>{leafChildren}</u>;
  if (leaf.link) leafChildren = <a href={leaf.text}>{leafChildren}</a>;
  if (leaf.hashtag)
    leafChildren = (
      <a href={leaf.text} className="text-muted">
        {leafChildren}
      </a>
    );
  return <span {...attributes}>{leafChildren}</span>;
};

export default Leaf;
