import React, { useRef, useEffect, useState } from 'react';
import { useSlate } from 'slate-react';
import classNames from 'classnames';
import { Editor, Range } from 'slate';
import { FaBold, FaItalic, FaUnderline, FaCode, FaLink } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { 
  isMarkActive,
  isLinkActive,
  toggleMark, 
  wrapLink, 
  unwrapLink 
} from 'utils/slateUtils'
import { Button, LinkButton } from './Button';
import './InlineToolbar.scss';

const InlineToolbar = () => {
  const ref = useRef();
  const inputRef = useRef(null);
  const editor = useSlate();
  const { selection } = editor;
  const [urlValue, setUrlValue] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    if (showUrlInput) {
      inputRef.current.focus();
    }
  }, [showUrlInput]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (
      !selection ||
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
      <Button 
        onClick={(event) => {
        event.preventDefault();
          toggleMark(editor, "bold");
        }}
        classList={classNames('btn-link', {
          active: isMarkActive(editor, "bold")
        })}
      >
        <FaBold />
      </Button>
      <Button 
        onClick={(event) => {
        event.preventDefault();
          toggleMark(editor, "italic");
        }}
        classList={classNames('btn-link', {
          active: isMarkActive(editor, "italic")
        })}
      >
        <FaItalic />
      </Button>
      <Button 
        onClick={(event) => {
        event.preventDefault();
          toggleMark(editor, "underlined");
        }}
        classList={classNames('btn-link', {
          active: isMarkActive(editor, "underlined")
        })}
      >
        <FaUnderline />
      </Button>
      <Button 
        onClick={(event) => {
        event.preventDefault();
          toggleMark(editor, "code");
        }}
        classList={classNames('btn-link', {
          active: isMarkActive(editor, "code")
        })}
      >
        <FaCode />
      </Button>
      <LinkButton
        handleSubmit={() => wrapLink(editor, urlValue)}
        handleClick={(e) => {
          e.preventDefault();
          if (isLinkActive(editor)) {
            unwrapLink(editor);
            setUrlValue('');
          }
          else setShowUrlInput(true);
        }}
        handleCloseInput={() => setShowUrlInput(false)}
        ref={inputRef}
        buttonClassList={classNames({ active: isLinkActive(editor) })}
        showInput={showUrlInput}
        value={urlValue}
        handleChange={setUrlValue}
      >
        <FaLink />
      </LinkButton>
    </div>,
    document.body
  );
};

export default InlineToolbar;
