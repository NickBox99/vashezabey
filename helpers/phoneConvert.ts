function phoneConvert(text: string) {
  return text.replace(/[^0-9]/gi ,'');
}

export { phoneConvert }
