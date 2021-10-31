import {FC} from 'react';
import {useSlate} from 'slate-react';
import styled from 'styled-components';
import {BlockEnum} from 'common/types';
import {toggleBlock, isBlockActive} from 'utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface BlockButtonProps {
  format: BlockEnum;
  icon?: BlockEnum;
}

const Button = styled.button<{active: boolean}>`
  color: ${({active, theme}) =>
    active ? theme.colors.primary : theme.colors.inactive};
  background: ${({theme}) => theme.colors.foreground};
  border: none;
  font: inherit;
  margin: 0;
  padding: 0.5em;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const getIcon = (icon: BlockEnum) => {
  switch (icon) {
    case 'bulleted-list':
      return 'list-ul';
    case 'numbered-list':
      return 'list-ol';
    case 'block-quote':
      return 'quote-left';
    default:
      return 'heading';
  }
};

const BlockButton: FC<BlockButtonProps> = ({format, children, icon}) => {
  const editor = useSlate();

  return (
    <Button
      data-testid="block-button"
      onMouseDown={e => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
      active={isBlockActive(editor, format)}
    >
      {children}
      {icon && <FontAwesomeIcon icon={getIcon(icon)} data-testid="mark-icon" />}
    </Button>
  );
};

export default BlockButton;
