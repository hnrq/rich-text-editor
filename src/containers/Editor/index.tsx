import {FC, useMemo, useState, useCallback} from 'react';
import {BaseEditor, createEditor, Descendant} from 'slate';
import {HistoryEditor, withHistory} from 'slate-history';
import {Slate, Editable, withReact, ReactEditor} from 'slate-react';
import styled from 'styled-components';

import Leaf from 'components/Leaf';

type CustomElement = {type: 'paragraph'; children: CustomText[]};
type CustomText = {text: string; bold?: true};

export type EditorType = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}

const EditorContainer = styled.div`
  width: min(100vw, 800px);
  height: 600px;
  box-shadow: 0 0 20px rgba(100, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.foreground};
  ${props => props.theme.mediaQuery.phone} {
    height: 100%;
  }
`;

const Editor: FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{text: 'Gang'}],
    },
  ]);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <EditorContainer>
      <Slate value={value} onChange={setValue} editor={editor}>
        <Editable
          renderLeaf={renderLeaf}
          onSelect={() => console.log(editor)}
        />
      </Slate>
    </EditorContainer>
  );
};

export default Editor;
