import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withRichText, HOTKEYS } from "utils/slateUtils";
import isHotkey from "is-hotkey";
import "./TextEditor.scss";
import {
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineItalic
} from "react-icons/ai";
import { MdCode } from "react-icons/md";
import { FaHeading } from "react-icons/fa";
import Toolbar from "./Toolbar";
import FormatButton from "./FormatButton";
import { Element } from "./Element";
import { Leaf } from "./Leaf";

type Props = {
  /** If the Editor is readOnly */
  readOnly: Boolean,
  /** List of CSS classes */
  classList: string | Array<string>
};

const Editor = ({ readOnly, classList }: Props) => {
  const editor = useMemo(() => withRichText(withReact(createEditor())), []);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ]);
  const [editorSelection, setEditorSelection] = useState(null);

  return (
    <Slate
      editor={editor}
      value={editorValue}
      selection={editorSelection}
      onChange={(value, selection) => {
        setEditorValue(value);
        setEditorSelection(selection);
      }}
    >
      <Toolbar>
        <FormatButton format="bold">
          <AiOutlineBold />
        </FormatButton>
        <FormatButton format="italic">
          <AiOutlineItalic />
        </FormatButton>
        <FormatButton format="underlined">
          <AiOutlineUnderline />
        </FormatButton>
        <FormatButton format="code">
          <MdCode />
        </FormatButton>
        <FormatButton format="heading-one">
          <FaHeading />
        </FormatButton>
        <FormatButton format="heading-two">
          <FaHeading />²
        </FormatButton>
        <FormatButton format="block-quote">"</FormatButton>
        <FormatButton format="numbered-list">
          <AiOutlineOrderedList />
        </FormatButton>
        <FormatButton format="bulleted-list">
          <AiOutlineUnorderedList />
        </FormatButton>
      </Toolbar>
      <Editable
        placeholder="Well, hello there!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
        onKeyDown={event => {
          if (event.ctrlKey) {
            Object.entries(HOTKEYS).forEach(([hotkey, format]) => {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                editor.exec({ type: "toggle_format", format });
              }
            });
          }
        }}
      />
    </Slate>
  );
};

export default Editor;
