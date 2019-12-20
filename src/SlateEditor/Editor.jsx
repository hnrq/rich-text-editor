import React, { 
  useState, 
  useMemo, 
  useCallback
} from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withRichText } from "utils/slateUtils";
import { withHistory } from "slate-history";
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
import handleKeyDown from './handleKeyDown';
import Toolbar from "./Toolbar";
import { BlockButton, MarkButton } from "./Button";
import { Element } from "./Element";
import { Leaf } from "./Leaf";

type Props = {
  /** If the Editor is readOnly */
  readOnly: Boolean,
  /** List of CSS classes */
  classList: string | Array<string>
};

const Editor = ({ readOnly, classList }: Props) => {
  const editor = useMemo(() => withRichText(withHistory(withReact(createEditor()))), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ]);

  return (
    <Slate
      editor={editor}
      value={editorValue}
      onChange={(value) => setEditorValue(value)}
    >
      <Toolbar>
        <MarkButton format="bold">
          <AiOutlineBold />
        </MarkButton>
        <MarkButton format="italic">
          <AiOutlineItalic />
        </MarkButton>
        <MarkButton format="underlined">
          <AiOutlineUnderline />
        </MarkButton>
        <MarkButton format="code">
          <MdCode />
        </MarkButton>
        <BlockButton format="heading-one">
          <FaHeading />
        </BlockButton>
        <BlockButton format="heading-two">
          <FaHeading />²
        </BlockButton>
        <BlockButton format="code-block">
          <MdCode />
        </BlockButton>
        <BlockButton format="block-quote">"</BlockButton>
        <BlockButton format="numbered-list">
          <AiOutlineOrderedList />
        </BlockButton>
        <BlockButton format="bulleted-list">
          <AiOutlineUnorderedList />
        </BlockButton>
      </Toolbar>
      <Editable
        placeholder="Well, hello there!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
        onKeyDown={(event) => handleKeyDown(event, editor)}
      />
    </Slate>
  );
};

export default Editor;
