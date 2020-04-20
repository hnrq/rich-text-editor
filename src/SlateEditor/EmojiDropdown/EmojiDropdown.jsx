import React, { useEffect, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { createPortal } from 'react-dom';
import { insertEmoji } from 'utils/slateUtils';
import classNames from 'classnames';
import './EmojiDropdown.scss';

export default ({ 
  target,
  editor,
  search,
  results,
  index
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (target && results.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [target, ref, search, editor, results]);

  return target && results.length > 0 ? createPortal((
    <div
      ref={ref}
      className="emoji-dropdown"
    >
      {results.map(([key, value], i) => (
        <div
          key={key}
          className={classNames('emoji', { active: i === index })}
          onClick={(e) => {
            e.preventDefault();
            insertEmoji(editor, key);
          }}
        >
          {value.emoji} {value.description}
        </div>
      ))}
    </div>
  ), document.body) : null;
};