import React from 'react';
import { HASHTAG_REGEX } from 'utils/regex';
import linkifyIt from 'linkify-it';

const linkify = linkifyIt();

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const linkStrategy = (contentBlock: Object, callback: Function) => {
  const links = linkify.match(contentBlock.getText());
  if (typeof links !== 'undefined' && links !== null) {
    links.forEach((link) => callback(link.index, link.lastIndex));
  }
};

const LinkComponent = ({ children }, props) => (
  <a {...props} className="link" href={children}>
    {children}
  </a>
);

function hashtagStrategy(block, callback, state) {
  findWithRegex(HASHTAG_REGEX, block, callback);
}

const HashtagComponent = ({ children }, props) => (
  <span {...props} className="hashtag text-muted">
    {children}
  </span>
);

const decorator = [
  {
    strategy: linkStrategy,
    component: LinkComponent
  },
  {
    strategy: hashtagStrategy,
    component: HashtagComponent
  }
];

export default decorator;
