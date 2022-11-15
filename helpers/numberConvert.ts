function numberConvert(val: number) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export { numberConvert }
