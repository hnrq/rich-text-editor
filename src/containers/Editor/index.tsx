import {FC, useMemo, useState, useCallback} from 'react';
import {createEditor, Descendant} from 'slate';
import {withHistory} from 'slate-history';
import {Slate, Editable, withReact} from 'slate-react';
import styled from 'styled-components';

import Leaf from 'components/Leaf';
import Element from 'components/Element';
import {BlockEnum, EditorType, MarkEnum} from 'common/types';
import {BLOCKS} from 'common';
import HoveringToolbar from 'components/HoveringToolbar';
import BlockButton from 'components/BlockButton';

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
  padding: 2rem min(${props => props.theme.spacing.md}, 10vw);
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.foreground};
  ${props => props.theme.mediaQuery.phone} {
    height: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  border-bottom: 2px solid ${({theme}) => theme.colors.background};
  margin-bottom: ${({theme}) => theme.spacing.xs};
`;

const Editor: FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{text: ''}],
    },
  ]);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  return (
    <EditorContainer>
      <Slate value={value} onChange={setValue} editor={editor}>
        <HoveringToolbar />
        <Header>
          {BLOCKS.filter(
            block => !['paragraph', 'list-item'].includes(block),
          ).map(block => (
            <BlockButton format={block} icon={block} key={block} />
          ))}
        </Header>
        <Editable
          autoFocus
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder="Go on, type something..."
          onKeyDown={e => {
            if (e.code === 'Enter' && e.shiftKey) {
              console.log(e.key, e.shiftKey);
              e.preventDefault();
              editor.insertText('\n');
            }
          }}
        />
      </Slate>
    </EditorContainer>
  );
};

export default Editor;
