import React from "react";
import { useSlate } from "slate-react";
import classNames from "classnames";
import { isBlockActive } from "utils/slateUtils";

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames("btn btn-link", {
        active: isBlockActive(editor, format)
      })}
      onClick={(event) => {
        event.preventDefault();
        editor.exec({ type: 'format_block', format });
      }}
    >
      {children}
    </button>
  );
};

export default React.memo(BlockButton);
