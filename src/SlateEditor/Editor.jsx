import React, { useState, useMemo, useCallback } from 'react';
import { 
  createEditor, 
  Text, 
  Transforms,
  Range,
  Node
  } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { 
  isBlockActive,
  insertImage,
  insertEmoji,
  toggleBlock, 
  withImages,
  withAnchors,
  withEmojis,
  getTokenLength,
  getCurrentWord
} from 'utils/slateUtils';
import emojis from 'utils/emojis';
import Prism from 'prismjs';
import { execAll } from 'utils';
import { withHistory } from 'slate-history';
import classNames from 'classnames';
import './TextEditor.scss';
import {
  FaHeading,
  FaListOl,
  FaListUl,
  FaCode,
  FaQuoteRight,
  FaFileImage
} from 'react-icons/fa';
import linkifyIt from 'linkify-it';
import handleKeyDown from './handleKeyDown';
import InlineToolbar from './InlineToolbar';
import { HASHTAG_REGEX, BEFORE_EMOJI_REGEX } from 'utils/regex';
import Toolbar from './Toolbar';
import { Button, ImageButton } from './Button';
import { EmojiDropdown } from './EmojiDropdown/';
import { Element } from './Element';
import { Leaf } from './Leaf';

type Props = {
  /** If the Editor is readOnly */
  readOnly: Boolean,
  /** List of CSS classes */
  classList: string | Array<string>
};

const linkify = linkifyIt();
Transforms.deselect = () => {};

const SlateEditor = ({ readOnly, classList }: Props) => {
  const editor = useMemo(
    () => withEmojis(withAnchors(withImages(withHistory(withReact(createEditor()))))), []
  );
  const [target, setTarget] = useState();
  const [emojiIndex, setEmojiIndex] = useState();
  const [search, setSearch] = useState();
  const results = useCallback(Object.entries(emojis).filter(([key]) => key.startsWith(search?.toLowerCase())).slice(0,5), [search]);
  const [editorValue, setEditorValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);
  const onKeyDown = useCallback(
    event => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = emojiIndex >= emojis.length - 1 ? 0 : emojiIndex + 1;
            setEmojiIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = emojiIndex <= 0 ? emojis.length - 1 : emojiIndex - 1;
            setEmojiIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertEmoji(editor, results[emojiIndex][0]);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
          default:
            break;
        }
      }
    },
    [emojiIndex, target, editor, results]
  );

  const decorate = useCallback(([node, path]) => {
    const ranges = [];
    if(node.type === 'code-block') {
      const code = Node.string(node);
      const tokens = Prism.tokenize(code, Prism.languages.javascript);
      let start = 0;

      for (const token of tokens) {
        const length = getTokenLength(token);
        const end = start + length;
        if (typeof token !== 'string') {
          ranges.push({
            token: token.type,
            anchor: { path, offset: start },
            focus: { path, offset: end }
          });
        }
        start = end;
      }
    };
    if (Text.isText(node)) {
      const { text } = node;
      if (text) {
        (linkify.match(text) || []).forEach(({ index, lastIndex }) => {
            ranges.push({
              anchor: { path, offset: lastIndex },
              focus: { path, offset: index },
              link: true
            });
          });
        execAll(text, HASHTAG_REGEX).forEach(({ index, lastIndex }) => {
          ranges.push({
            anchor: { path, offset: lastIndex },
            focus: { path, offset: index },
            hashtag: true
          });
        });
      }    
    }
    return ranges;
  }, []);

  return (
    <Slate
      value={editorValue}
      onChange={(value) => {
        const { selection } = editor;
        setEditorValue(value);
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = getCurrentWord(editor, start);
          const emojiMatch = BEFORE_EMOJI_REGEX.exec(wordBefore.text);
          if(emojiMatch) {
            setSearch(emojiMatch[1]);
            setTarget(wordBefore.range);
            setEmojiIndex(0);
            return;
          }
        }
        setTarget(null);
      }}
      editor={editor}
    >
      <EmojiDropdown 
        target={target}
        editor={editor}
        results={results}
        search={search}
        index={emojiIndex}
      />
      <InlineToolbar />
      <Toolbar>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "heading-one");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "heading-one")
          })}
        >
          <FaHeading />
        </Button>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "heading-two");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "heading-two")
          })}
        >
          <FaHeading /><sub>2</sub>
        </Button>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "code-block");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "code-block")
          })}
        >
          <FaCode />
        </Button>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "block-quote");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "block-quote")
          })}
        >
          <FaQuoteRight />
        </Button>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "numbered-list");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "numbered-list")
          })}
        >
          <FaListOl />
        </Button>
        <Button 
          onClick={(event) => {
            event.preventDefault();
            toggleBlock(editor, "bulleted-list");
          }}
          classList={classNames('btn-link', {
            active: isBlockActive(editor, "bulleted-list")
          })}
        >
          <FaListUl />
        </Button>
        <ImageButton handleSubmit={(value) => insertImage(editor, value)}><FaFileImage /></ImageButton>
      </Toolbar>
      <Editable
        placeholder="Well, hello there!"
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Leaf {...props} />}
        autoFocus
        decorate={decorate}
        onKeyDown={(event) => {
          onKeyDown(event);
          handleKeyDown(event, editor);
        }}
      />
    </Slate>
  );
};

export default SlateEditor;
