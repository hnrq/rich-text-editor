export default function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  const matchArr = regex.exec(text);
  let start;
  while (matchArr !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}