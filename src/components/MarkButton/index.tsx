import {FC} from 'react';
import {useSlate} from 'slate-react';
import styled from 'styled-components';
import {MarkEnum} from 'common/types';
import {toggleMark, isMarkActive} from 'utils';

interface MarkButtonProps {
  format: MarkEnum;
}

const Button = styled.button<{active: boolean}>`
  color: ${({active, theme}) =>
    active ? theme.colors.foreground : theme.colors.background};
  border: none;
  margin: 0;
  padding: 0.25em 0.5em;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const MarkButton: FC<MarkButtonProps> = ({format, children}) => {
  const editor = useSlate();

  return (
    <Button
      data-testid="mark-button"
      onMouseDown={e => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      active={isMarkActive(editor, format)}
    >
      {children}
    </Button>
  );
};

export default MarkButton;
