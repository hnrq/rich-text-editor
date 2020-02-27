export function debounce(fn, time) {
  let timeout;

  return () => {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

export const execAll = (text, regExp) => {
  const result = [];
  let match;
  while ((match = regExp.exec(text)) !== null)
    result.push({
      ...match,
      lastIndex: regExp.lastIndex
    });
  return result;
};
