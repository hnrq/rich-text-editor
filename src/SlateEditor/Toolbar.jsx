import React from "react";
import classNames from "classnames";
import "./Toolbar.scss";

type Props = {
  /** String className or Array of String classNames to add to the component */
  classList: string | Array<string>,
  /** Children to be rendered inside the toolbar */
  children: React$Element<any>
};

const Toolbar = React.memo(({ children, classList }: Props) => (
  <div className={classNames(classList, "toolbar")}>{children}</div>
), (prevProps, nextProps) => prevProps.children === nextProps.children);

export default Toolbar;
