function replaceTextBr(text) {
  return text.replace(/\r?\n/g, '<br/>');
}

export { replaceTextBr }
