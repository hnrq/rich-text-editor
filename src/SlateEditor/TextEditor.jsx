import React, { useState, useRef } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon, 
  CodeIcon, 
  ListIcon,
  TitleIcon
} from 'icons';
import { commands } from './commands';
import initialValue from './value.json';
import { plugins } from './plugins';
import { renderMark } from './renderMark';
import Toolbar from './Toolbar';
import { renderBlock } from './renderBlock';
import './TextEditor.scss';
import { schema } from './schema';

type Props = {
  /** String className or Array of String classNames to add to the component */
  classList: string | Array<string>,
  /** Whether or not the editor will be readOnly */
  readOnly: boolean
}

const MARK_TYPES = [
  {
    type: 'bold',
    children: <BoldIcon />
  },
  {
    type: 'italic',
    children: <ItalicIcon />
  },
  { 
    type: 'underline',
    children: <UnderlineIcon />
  }
];

const BLOCK_TYPES = [
  {
    type: 'heading',
    children: <TitleIcon />
  },
  { 
    type: 'code_block',
    children: <CodeIcon />
  },
  { 
    type: 'list',
    children: <ListIcon />
  },
  {
    type: 'quote',
    children: <strong>&ldquo;</strong>
  }
];

const queries = {
  isLinkActive(editor, value) {
    const { inlines } = value;
    const active = inlines.some(i => i.type === 'link');
    return active;
  }
};

const TextEditor = ({ readOnly, classList }: Props) => {
  const [value, setValue] = useState(Value.fromJSON(initialValue));
  const editorRef = useRef(null);

  const handleChange = editor => setValue(editor.value); 
  
  const handleMarkClick = (e, type) => {
    e.preventDefault();
    editorRef.current.toggleMark(type);
    editorRef.current.focus();
  };

  const handleBlockClick = (e, type) => {
    e.preventDefault();
    const isTypeActive = editorRef.current.value.blocks.some(block => block.type === type);
    editorRef.current.setBlocks(isTypeActive ? 'paragraph' : type);
  };

  const handleImageSubmit = (e, src) => {
    e.preventDefault();
    editorRef.current.insertBlock({
      type: 'image',
      data: { src }
    });
    editorRef.current.insertBlock({ type: 'paragraph' });
  };

  return (
    <div>
      <Toolbar
        value={value}
        handleMarkClick={handleMarkClick}
        handleBlockClick={handleBlockClick}
        handleImageSubmit={handleImageSubmit}
        marks={MARK_TYPES} 
        blocks={BLOCK_TYPES}
      />
      <Editor 
        value={value}
        schema={schema}
        autoFocus
        commands={commands}
        ref={editorRef}
        queries={queries}
        renderBlock={renderBlock}
        placeholder="Write something..."
        plugins={plugins}
        renderMark={renderMark}
        onChange={handleChange} />
    </div>
  );
};

export default TextEditor;