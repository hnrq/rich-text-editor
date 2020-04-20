import React from 'react';
import type { Leaf as LeafType } from 'slate';
import isEqual from 'react-fast-compare';

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
  if (leaf.token) leafChildren = <span className={`token ${leaf.token}`}>{leafChildren}</span>;
  if (leaf.hashtag && !leaf.link)
    leafChildren = (
      <a href={leaf.text} className="text-muted">
        {leafChildren}
      </a>
    );
  return <span {...attributes}>{leafChildren}</span>;
};

const areEqual = (prevProps, nextProps) => isEqual(prevProps.children, nextProps.children);

export default React.memo(Leaf, areEqual);
