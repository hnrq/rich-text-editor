import React from "react";
import classNames from 'classnames';
import './StyleButton.scss';

const StyleButton = ({ className, onToggle, label, active, style }) => (
  <button
    className={classNames("style-button btn-sm btn", className, {
      'btn-link': !active,
      'btn-dark': active
    })}
    onMouseDown={(e) => {
      e.preventDefault();
      onToggle(style);
    }}
    tabIndex="-1"
  >
    {label}
  </button>
);

export default StyleButton;
