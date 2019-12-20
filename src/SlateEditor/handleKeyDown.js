import { HOTKEYS, isBlockActive } from 'utils/slateUtils';
import isHotkey from 'is-hotkey';

export default function handleKeyDown(event, editor) {
  if (event.ctrlKey) {
    Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        editor.exec({
          type: 'format_text',
          properties: { [mark]: true },
        });
      }
    });
  }
  if (event.key === 'Enter' && event.shiftKey) {
    event.preventDefault();
    editor.exec({
      type: 'insert_text',
      text: '\n'
    });
  }
  if (event.key === 'Tab' && isBlockActive(editor, 'code-block')) {
    event.preventDefault();
    editor.exec({
      type: 'insert_text',
      text: '\t'
    });
  }
}