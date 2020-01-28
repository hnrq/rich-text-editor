// @flow
import React, { useState } from 'react';
import classNames from 'classnames';

import './SwitchButton.scss';

type Props = {
  onToggle: Function,
  onUntoggle: Function,
  isToggled?: boolean,
  classList?: string | Array<string>,
  activeClassList?: string | Array<string>
};

const SwitchButton = ({ 
  onToggle, 
  onUntoggle, 
  isToggled,
  classList,
  activeClassList 
}: Props) => {
  const [toggled, setToggled] = useState(isToggled);
  
  const handleClick = () => {
    if (toggled) onUntoggle();
    else onToggle();
    setToggled(!toggled);
  };

  return (
    <div className="switch-container">
      <div 
        className={classNames("btn-switch", classList, toggled && activeClassList, {
          active: toggled
        })}
        onClick={handleClick}
      />
    </div>
  );
};

SwitchButton.defaultProps = {
  isToggled: false,
  classList: null,
  activeClassList: null
};

export default SwitchButton;