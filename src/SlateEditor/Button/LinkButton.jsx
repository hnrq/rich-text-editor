import React, { useState, useRef, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { IoMdClose } from 'react-icons/io';
import { isLinkActive, insertLink } from 'utils/slateUtils';
import classNames from 'classnames';
import './Button.scss';
import './LinkButton.scss';

type Props = {
  children: React$Element<any>,
  onDisplayInput: Function
};

const LinkButton = ({ children, onDisplayInput }: Props) => {
  const editor = useSlate();
  const inputRef = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [showURLInput, setShowURLInput] = useState(false);
  useEffect(() => {
    onDisplayInput(showURLInput);
  }, [showURLInput, onDisplayInput]);
  return (
    <>
      <div className={classNames('input-section', { 'd-none': !showURLInput })}>
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          value={urlValue}
          placeholder="Ex.: www.google.com"
          onKeyDown={(event) => {
            const { key } = event;
            if (key === 'Enter') {
              event.preventDefault();
              insertLink(editor, urlValue);
              setShowURLInput(false);
            }
          }}
          onChange={(e) => setUrlValue(e.target.value)}
          onBlur={(e) => setShowURLInput(false)}
        />
        <button className="btn btn-link btn-close">
          <IoMdClose />
        </button>
      </div>
      <button
        className={classNames('btn btn-link', {
          active: isLinkActive(editor),
          'd-none': showURLInput
        })}
        onClick={() => {
          inputRef.current.focus();
          setShowURLInput(!showURLInput);
        }}
      >
        {children}
      </button>
    </>
  );
};

LinkButton.defaultProps = {
  onDisplayInput: () => {}
};

export default LinkButton;
