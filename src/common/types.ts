import {BaseEditor} from 'slate';
import {HistoryEditor} from 'slate-history';
import {ReactEditor} from 'slate-react';
import {BLOCKS, LISTS, MARKS} from '.';

export type MarkEnum = typeof MARKS[number];
export type ListEnum = typeof LISTS[number];
export type BlockEnum = typeof BLOCKS[number];

export type EditorType = BaseEditor & ReactEditor & HistoryEditor;
