function textToHtmlText(text) {
  return text.replace(/\r?\n/g, '<br/>');
}

export { textToHtmlText }
