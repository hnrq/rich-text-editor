export const commands = {
  wrapLink(change, url) {
    change.wrapInline({ type: 'link', data: { url } });
  },
  unwrapLink(change) {
    change.unwrapInline('link');
  },
};
