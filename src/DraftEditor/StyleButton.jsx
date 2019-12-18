import React from 'react';
import classNames from 'classnames';

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
    <button className={classNames("btn btn-link style-button", { active })} onClick={toggleActive}>
      {label}
    </button>
  );
};
export default StyleButton;