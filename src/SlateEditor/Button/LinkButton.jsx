import React, { useState, useRef, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { IoMdClose } from 'react-icons/io';
import linkifyIt from 'linkify-it';
import { isLinkActive, wrapLink, unwrapLink } from 'utils/slateUtils';
import classNames from 'classnames';
import './Button.scss';
import './LinkButton.scss';

type Props = {
  children: React$Element<any>
};

const linkify = linkifyIt();

const LinkButton = ({ children }: Props) => {
  const editor = useSlate();
  const inputRef = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [showURLInput, setShowURLInput] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (showURLInput) {
      inputRef.current.focus();
      setIsValid(true);
    }
  }, [showURLInput]);

  return (
    <>
      <div className={classNames('input-section', { 'visible': showURLInput, 'invisible': !showURLInput})}>
        <input
          ref={inputRef}
          type="text"
          className={classNames("form-control", { 'invalid': !isValid })}
          value={urlValue}
          placeholder="Ex.: www.google.com"
          onKeyDown={(e) => {
            const { key } = e;
            console.log(linkify.test(urlValue))
            if (!linkify.test(urlValue)) setIsValid(false);
            if (key === 'Enter') {
              e.preventDefault();
              if (linkify.test(urlValue)) {
                wrapLink(editor, urlValue);
                setShowURLInput(false);
              }
            }
          }}
          onChange={(e) => setUrlValue(e.target.value)}
          onBlur={(e) => setShowURLInput(false)}
        />
        <button 
          onMouseDown={(e) => {
            e.preventDefault();
            setShowURLInput(false);
          }} 
          className="btn btn-link btn-close"
        >
          <IoMdClose />
        </button>
      </div>
      <button
        className={classNames('btn btn-link btn-anchor', {
          active: isLinkActive(editor),
          'visible': !showURLInput,
          'invisible': showURLInput
        })}
        onMouseDown={(e) => {
          e.preventDefault();
          if (isLinkActive(editor)) {
            unwrapLink(editor);
            setUrlValue('');
          }
          else setShowURLInput(true);
        }}
      >
        {children}
      </button>
    </>
  );
};

export default LinkButton;
