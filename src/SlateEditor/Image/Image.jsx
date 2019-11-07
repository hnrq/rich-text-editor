import React from 'react';
import classNames from 'classnames';
import './Image.scss';

const Image = ({ node, editor, readOnly }) => {
  const src = node.data.get('src');
  const align = node.data.get('align');

  const handleChange = e => editor.setNodeByKey(node.key, { data: { src, align: e.target.value } });
  return (
    <div 
      className={classNames("image-container", {
        left: align === 'left',
        center: align === 'center',
        right: align === 'right'
      })}>
        <div className="image">
          <img src={src} alt="inserted" />
          {!readOnly && (
            <select className="image-align" value={align} onChange={handleChange}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          )}
        </div>
    </div>
  )
};

export default Image;