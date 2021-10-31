import {FC, useMemo, useState, useCallback} from 'react';
import {createEditor, Descendant} from 'slate';
import {withHistory} from 'slate-history';
import {Slate, Editable, withReact} from 'slate-react';
import styled from 'styled-components';

import Leaf from 'components/Leaf';
import { BlockEnum, EditorType, MarkEnum } from 'common/types';

export type CustomElement = {type: BlockEnum; children: CustomText[]};
export type CustomText = {
  [key in MarkEnum]?: true;
} & {text: string};

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
        />
      </Slate>
    </EditorContainer>
  );
};

export default Editor;
