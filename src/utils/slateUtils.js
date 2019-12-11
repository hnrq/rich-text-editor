import { Editor } from "slate";

export const TEXT_FORMATS = ["bold", "italic", "underlined", "code"];
export const LIST_FORMATS = ["numbered-list", "bulleted-list"];
export const BLOCK_FORMATS = [
  ...LIST_FORMATS,
  "heading-one",
  "heading-two",
  "block-quote"
];

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underlined",
  "mod+`": "code"
};

export const isFormatActive = (editor, format) => {
  let match;
  if (TEXT_FORMATS.includes(format)) {
    [match] = Editor.nodes(editor, {
      match: { [format]: true },
      mode: "all"
    });
  } else {
    [match] = Editor.nodes(editor, {
      match: { type: format },
      mode: "all"
    });
  }
  return !!match;
};

export const withRichText = editor => {
  const { exec } = editor;

  editor.exec = command => {
    if (command.type === "toggle_format") {
      const { format } = command;
      const isActive = isFormatActive(editor, format);
      const isList = LIST_FORMATS.includes(format);

      if (TEXT_FORMATS.includes(format)) {
        Editor.setNodes(
          editor,
          { [format]: isActive ? null : true },
          { match: "text", split: true }
        );
      }

      if (BLOCK_FORMATS.includes(format)) {
        LIST_FORMATS.forEach(f =>
          Editor.unwrapNodes(editor, {
            match: { type: f },
            split: true
          })
        );

        Editor.setNodes(editor, {
          type: isActive ? "paragraph" : isList ? "list-item" : format
        });

        if (!isActive && isList) {
          Editor.wrapNodes(editor, { type: format, children: [] });
        }
      }
    } else {
      exec(command);
    }
  };

  return editor;
};
