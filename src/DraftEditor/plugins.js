import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import './prism.css';

const plugins = [
  createPrismPlugin({
    prism: Prism
  })
];

export default plugins;
