import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import './prism.css';

const plugins = [
  createPrismPlugin({
    prism: Prism
  }),
  createHashtagPlugin(),
  createLinkifyPlugin(),
];

export default plugins;