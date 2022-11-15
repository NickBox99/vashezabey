function dateConvert(val: number | Date) {
  return new Intl.DateTimeFormat('ru-RU').format(val);
}

export { dateConvert }
