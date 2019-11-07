import React, { useState } from 'react';
import classNames from 'classnames';
import './Toolbar.scss';
import { ImageIcon } from 'icons';

type Props = {
  /** String className or Array of String classNames to add to the component */
  classList: string | Array<string>,
  /** Children to be rendered inside the toolbar */
  children: React$Element<any>,
  /** Block type markdown buttons */
  blocks: Array<{type: string, children: React$Element<any>}>,
  /** Mark type buttons */
  marks: Array<{type: string, children: React$Element<any>}>,
  /** Function to be fired on mark button click */
  handleMarkClick: Function,
  /** Function to be fired on block button click */
  handleBlockClick: Function,
  /** Function to be fired on image url submit */
  handleImageSubmit: Function,
  /** Slate Editor Value */
  value: any
}


const Toolbar = ({ 
  handleMarkClick, 
  handleBlockClick, 
  children, 
  classList, 
  handleImageSubmit,
  blocks, 
  marks,
  value
}:Props) => {
  const [displayUrlInput, setDisplayUrlInput] = useState(false);
  const [url, setUrl] = useState('');

  return (
    <div className={classNames(classList, 'toolbar')}>
    {blocks.map(({ type, children: blockChildren }) => (
      <button 
      key={type}  
      onClick={e => handleBlockClick(e, type)}
      className={classNames("tooltip-icon-button", {
        active: value.blocks.some(block => (block.type !== 'image' && block.type === type))
      })}>
        {blockChildren}
      </button>
    ))}
    <div className="image-upload">
      <button 
        className={classNames("tooltip-icon-button", {
          active: displayUrlInput
        })}
        onClick={() => setDisplayUrlInput(!displayUrlInput)}>
          <ImageIcon />
      </button>
      {displayUrlInput && (
      <div className="url-input-container">
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
        <button disabled={url.length === 0} onClick={(e) => handleImageSubmit(e, url)}>Add</button>
      </div>
      )}
    </div>
    {marks.map(({ type, children: markChildren }) => (
      <button 
      key={type}  
      onClick={e => handleMarkClick(e, type)}
      className={classNames("tooltip-icon-button", {
        active: value.marks.some(mark => mark.type === type)
      })}>
        {markChildren}
      </button>
    ))}
    </div>
  );
};

export default Toolbar;
