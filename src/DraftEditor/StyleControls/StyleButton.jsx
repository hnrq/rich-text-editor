import React from 'react';
import classNames from 'classnames';
import './StyleButton.scss';

const StyleButton = ({ 
  active, 
  onToggle, 
  style,
  label 
}) => {
  const toggleActive = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <button 
    className={classNames("btn btn-link style-button", { 'btn-active': active })} 
    onMouseDown={toggleActive}>
      {label}
    </button>
  );
};
export default StyleButton;