import {MARKS} from 'common';
import {EditorType} from 'common/types';
import MarkButton from 'components/MarkButton';
import {FC, useEffect, useState, useMemo, useRef} from 'react';
import ReactDOM from 'react-dom';
import {ReactEditor, useSlate} from 'slate-react';
import styled from 'styled-components';

import {isSelected} from 'utils';

interface MenuProps {
  rect?: DOMRect;
  element?: HTMLDivElement | null;
}

const Menu = styled.div<MenuProps>`
  position: absolute;
  background: #000000;
  z-index: 1;
  border-radius: 1rem;
  transform: translate(-50%, -110%);
  top: ${({rect, element}) =>
    (rect?.top ?? 0) + window.pageYOffset - (element?.offsetHeight ?? 0)}px;
  left: ${({rect, element}) =>
    (rect?.left ?? 0) +
    window.pageXOffset -
    (element?.offsetWidth ?? 0) / 2 +
    (rect?.width ?? 0) / 2}px;
`;

const HoveringToolbar: FC = () => {
  const [visible, setVisible] = useState(false);
  const editor = useSlate() as ReactEditor;
  const ref = useRef<HTMLDivElement>(null);
  const rect = useMemo(() => {
    const selection = window.getSelection && window.getSelection();
    if ((selection?.rangeCount ?? 0) > 0)
      return selection?.getRangeAt(0).getBoundingClientRect();
  }, [visible]);

  useEffect(() => {
    if (isSelected(editor as EditorType) && window.getSelection())
      setVisible(true);
    else setVisible(false);
  }, [editor.selection]);

  return visible
    ? ReactDOM.createPortal(
        <Menu element={ref.current} rect={rect} data-testid="hovering-toolbar">
          {MARKS.map(mark => (
            <MarkButton key={mark} format={mark} icon={mark} />
          ))}
        </Menu>,
        document.body,
      )
    : null;
};

export default HoveringToolbar;
