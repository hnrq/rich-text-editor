import React, { useRef, useEffect } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Range } from 'slate';
import { FaBold, FaItalic, FaUnderline, FaCode } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { MarkButton } from './Button';
import './InlineToolbar.scss';

const InlineToolbar = () => {
  const ref = useRef();
  // const [displayInput, setDisplayInput] = useState(false);
  const editor = useSlate();
  const { selection } = editor;

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;
    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      element.removeAttribute('style');
      return undefined;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    element.style.opacity = 1;
    element.style.top = `${rect.top +
      window.pageYOffset -
      element.offsetHeight}px`;
    element.style.left = `${rect.left +
      window.pageXOffset -
      element.offsetWidth / 2 +
      rect.width / 2}px`;
  }, [selection, editor]);

  return createPortal(
    <div ref={ref} className="inline-toolbar-slate">
      <MarkButton format="bold">
        <FaBold />
      </MarkButton>
      <MarkButton format="italic">
        <FaItalic />
      </MarkButton>
      <MarkButton format="underlined">
        <FaUnderline />
      </MarkButton>
      <MarkButton format="code">
        <FaCode />
      </MarkButton>
      {/* <LinkButton
        onDisplayInput={(value) => setDisplayInput(value)}
      >
        <FaLink />
      </LinkButton> */}
    </div>,
    document.body
  );
};

export default InlineToolbar;
