import React, { useState, useRef } from 'react';
import { useSlate } from 'slate-react';
import { isLinkActive, insertLink } from 'utils/slateUtils';
import classNames from 'classnames';
import './Button.scss';
import './LinkButton.scss';

type Props = {
  children: React$Element<any>
};

const LinkButton = ({ children }: Props) => {
  const editor = useSlate();
  const inputRef = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [showURLInput, setShowURLInput] = useState(false);

  const submitLink = (e) => {
    e.preventDefault();
    insertLink(editor, urlValue);
    setShowURLInput(false);
  };

  return (
    <div className="link-button">
      <form
        className={classNames('input-group', { 'd-none': !showURLInput })}
        onSubmit={submitLink}
      >
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          value={urlValue}
          placeholder="Ex.: www.google.com"
          onChange={(e) => setUrlValue(e.target.value)}
          onBlur={(e) => setShowURLInput(false)}
        />
        <div className="input-group-append">
          <input
            className="btn btn-outline-secondary"
            type="submit"
            value="Add"
          />
        </div>
      </form>
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
    </div>
  );
};

export default LinkButton;
