import React from 'react';
import classNames from 'classnames';
import { useFocused, useSelected } from 'slate-react';

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div className="image-element" {...attributes}>
      <div contentEditable={false}>
        <img
          alt="pic"
          src={element.url}
          className={classNames(selected && focused && 'focused')}
        />
      </div>
      {children}
    </div>
  )
}

export default ImageElement;