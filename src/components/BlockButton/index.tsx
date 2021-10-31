import { FC } from "react";
import { useSlate } from "slate-react";
import styled from 'styled-components';
import {BlockEnum} from 'common/types';
import {toggleBlock, isBlockActive} from 'utils';

interface BlockButtonProps {
  format: BlockEnum;
}

const Button = styled.button<{active: boolean}>`
  color: ${({active, theme}) => active ? theme.colors.primary : theme.colors.background};
  border: none;
  font: inherit;
  margin: 0;
  padding: 0.25em 0.5em;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const BlockButton: FC<BlockButtonProps> = ({format, children}) => {
  const editor = useSlate();

  return (
    <Button
      data-testid="block-button"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      active={isBlockActive(editor, format)}
    >
      {children}
    </Button>
  );
}

export default BlockButton;