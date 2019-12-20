import React from "react";
import { useSlate } from "slate-react";
import classNames from "classnames";
import { isMarkActive } from "utils/slateUtils";

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames("btn btn-link", {
        active: isMarkActive(editor, format)
      })}
      onClick={(event) => {
        event.preventDefault();
        editor.exec({ type: 'format_text', properties: { [format]: true } });
      }}
    >
      {children}
    </button>
  );
};

export default React.memo(MarkButton);
