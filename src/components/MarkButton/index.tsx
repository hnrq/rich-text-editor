import {FC} from 'react';
import {useSlate} from 'slate-react';
import styled from 'styled-components';
import {MarkEnum} from 'common/types';
import {toggleMark, isMarkActive} from 'utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface MarkButtonProps {
  format: MarkEnum;
  icon?: 'underline' | 'bold' | 'italic' | 'code';
}

const Button = styled.button<{active: boolean}>`
  color: ${({active, theme}) =>
    active ? theme.colors.foreground : theme.colors.inactive};
  background: #000;
  border: none;
  margin: 0;
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const MarkButton: FC<MarkButtonProps> = ({format, children, icon}) => {
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
      {icon && <FontAwesomeIcon icon={icon} data-testid="mark-icon" />}
    </Button>
  );
};

export default MarkButton;
