import React from 'react';
import { IoMdClose } from 'react-icons/io';
import linkifyIt from 'linkify-it';
import classNames from 'classnames';
import './Button.scss';
import './LinkButton.scss';

type Props = {
  children: React$Element<any>,
  handleSubmit: (value: string) => void,
  handleClick: () => void,
  handleCloseInput: () => void,
  buttonClassList: string | Array<string>,
  showInput: boolean
};

const linkify = linkifyIt();

const LinkButton = React.forwardRef(({ 
  children,
  handleSubmit,
  handleCloseInput,
  handleClick,
  buttonClassList,
  showInput,
  value,
  handleChange
}: Props, ref) => (
  <>
    <div className={classNames('anchor-input-section', showInput ? 'visible' : 'invisible')}>
      <input
        ref={ref}
        type="text"
        className={classNames("form-control", { 'invalid': !linkify.test(value) })}
        value={value}
        placeholder="Ex.: www.google.com"
        onKeyDown={(e) => {
          const { key } = e;
          if (key === 'Enter') {
            e.preventDefault();
            if (linkify.test(value)) {
              handleSubmit();
              handleCloseInput();
            }
          }
        }}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleCloseInput}
      />
      <button 
        onMouseDown={handleCloseInput} 
        className="btn btn-link btn-close"
      >
        <IoMdClose />
      </button>
    </div>
    <button
      className={classNames('btn btn-link btn-anchor', 
      showInput ? 'invisible' : 'visible', 
      buttonClassList)}
      onMouseDown={handleClick}
    >
      {children}
    </button>
  </>
));

LinkButton.defaultProps = {
  showInput: false
};

const areEqual = (prevProps, nextProps) => (
  prevProps.showInput === nextProps.showInput
  || prevProps.classList === nextProps.classList
  || prevProps.urlValue === nextProps.urlValue
);

export default React.memo(LinkButton, areEqual);
