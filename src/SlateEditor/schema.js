export const schema = {
  document: {
    nodes: [
      {
        match: [
          { type: 'paragraph' }, 
          { type: 'image' }, 
          { type: 'link' },
          { type: 'heading' },
          { type: 'quote' },
          { type: 'list' },
          { type: 'code_block' }
        ],
        min: 1
      },
    ],
  },
  blocks: {
    paragraph: {
      nodes: [
        {
          match: { object: 'text' },
        },
      ],
    },
    link: {
      nodes: [{ match: { object: "text" } }],
    },
    heading: {
      nodes: [{ match: { object: 'text' } }],
    },
    list: {
      nodes: [{ type: 'list_item' }],
    },
    list_item: {
      parent: [{ type: 'list' }],
    },
    code_block: { marks: [""] },
    quote: {
      nodes: [
        {
          match: { object: 'text' },
        },
      ],
    },
    image: { isVoid: true },
    horizontal_rule: { isVoid: true },
  }
};