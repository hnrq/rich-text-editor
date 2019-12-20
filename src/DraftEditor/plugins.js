import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import './prism.css';

const plugins = [
  createPrismPlugin({
    prism: Prism
  }),
  createLinkifyPlugin(),
];

export default plugins;