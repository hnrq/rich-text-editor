import PrismDraftDecorator from 'draft-js-prism';
import React from 'react';
import { CompositeDecorator } from 'draft-js';
import findWithRegex from 'utils/findWithRegex';
import * as regex from 'utils/regex';

function hashtagStrategy(contentBlock, callback) {
  findWithRegex(regex.hashtagRegex, contentBlock, callback);
}

const HashtagComponent = (props) => (
  <span {...props} className="hashtag">
    {props.children}
  </span>
);

const compositeDecorator = new CompositeDecorator([
  {
    strategy: hashtagStrategy,
    component: HashtagComponent 
  }
]);

export default compositeDecorator;
