import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { isImageUrl } from 'utils/slateUtils';
import classNames from 'classnames';
import './Button.scss';
import './ImageButton.scss';

type Props = {
  handleSubmit: (value: string) => void,
  children: React$Element<any>
};

const ImageButton = ({ children, handleSubmit }: Props) => {
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
    <div className="btn-image">
      <div className={classNames('image-input-section align-items-center flex-row', { 'd-flex': showURLInput, 'd-none': !showURLInput})}>
        <input
          ref={inputRef}
          type="text"
          className={classNames("form-control", { 'invalid': !isValid })}
          value={urlValue}
          placeholder="Ex.: imgur.com/abc.jpg"
          onKeyDown={(e) => {
            const { key } = e;
            if (key === 'Enter') {
              e.preventDefault();
              if (isImageUrl(urlValue)) {
                handleSubmit(urlValue);
                setShowURLInput(false);
              } else { 
                setIsValid(false);
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
          'd-inline-block': !showURLInput,
          'd-none': showURLInput
        })}
        onMouseDown={(e) => setShowURLInput(true)}
      >
        {children}
      </button>
    </div>
  );
};

export default React.memo(ImageButton);
