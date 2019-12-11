import React from "react";
import { useSlate } from "slate-react";
import classNames from "classnames";
import { isFormatActive } from "utils/slateUtils";

const FormatButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      className={classNames("btn btn-link", {
        active: isFormatActive(format)
      })}
      onClick={() => editor.exec({ type: "toggle_format", format })}
    >
      {children}
    </button>
  );
};

export default React.memo(FormatButton);
