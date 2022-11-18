function sortArrayByPos(arr) {
  return arr.sort((first, second) => first.pos - second.pos);
}

export { sortArrayByPos }
