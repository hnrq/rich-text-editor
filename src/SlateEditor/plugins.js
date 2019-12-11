import SoftBreak from 'slate-soft-break';
import When from 'slate-when';
import Keymap from "@convertkit/slate-keymap";
import AutoReplace from 'slate-auto-replace';
import PasteLinkify from 'slate-paste-linkify';
import InstantReplace from 'slate-instant-replace';
import isUrl from "is-url";

const addUrl = (editor, lastWord) => {
  if (isUrl(lastWord)) {
    editor.moveFocusBackward(lastWord.length);
    editor.unwrapInline("link");
    const href = lastWord.startsWith("http") ? lastWord : `https://${lastWord}`;
    editor.wrapInline({ type: "link", data: { href } });
    editor.moveFocusForward(lastWord.length);
  }
};

export const plugins = [
  When({
    when: value => value.blocks.every(b => b.type === 'code_block'),
    plugin: SoftBreak()
  }),
  When({
    when: value => !value.blocks.some(b => b.type === 'code'),
    plugin: SoftBreak({ shift: true })
  }),
  PasteLinkify({
    type: "link",
    collapseTo: "end",
  }),
  Keymap({
    "mod+b": (event, editor) => editor.toggleMark("bold"),
    "mod+i": (event, editor) => editor.toggleMark("italic"),
    "mod+u": (event, editor) => editor.toggleMark("underline"),
    "mod+l": (event, editor) => editor.toggleMark("list")
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    change: change => change.setBlocks('quote'),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-)$/,
    change: change => change.setBlocks('list_item').wrapBlock('list'),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(https)$/,
    change: change => change.setBlocks('link'),
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(-{3})$/,
    change: change => change.setBlocks({ type: 'hr', isVoid: true }),
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    change: (change, event, matches) => {
      const [hashes] = matches.before;
      const level = hashes.length;
      change.setBlocks({ type: 'heading', data: { level } });
    },
  }),
  InstantReplace(addUrl)
];