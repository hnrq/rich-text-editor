import React from 'react';
import classNames from 'classnames';
import './Button.scss';

type Props = {
  children: React$Element<any>,
  classList: string | Array<string>,
  onClick: Function
};

const Button = React.memo(({ children, classList, onClick }: Props) => (
  <button
    className={classNames('btn', classList)}
    onClick={onClick}
  >
    {children}
  </button>
), (prevProps, nextProps) => prevProps.classList === nextProps.classList);

export default Button;
