function getPosElementDB(elements, newPos, el) {
  const size = elements.length;
  if (!size || newPos < 0 || newPos >= size || elements[newPos].pos === el.pos) {
    return 0;
  }

  let pos;
  const lastIdx = size - 1;

  if (lastIdx === newPos) {
    pos = elements[lastIdx].pos + 1000;
  }
  else if(newPos === 0) {
    pos = elements[0].pos - 1000;
  }
  else {
    const nextPos = elements[newPos + 1].pos;
    const prevPos = elements[newPos - 1].pos;
    const nowPos = elements[newPos].pos;

    if (elements[newPos].pos > el.pos) {
      pos = nowPos + ((nextPos - nowPos) / 2);
    }
    else {
      pos = prevPos + ((nowPos - prevPos) / 2);
    }

    const posInt = Math.ceil(pos);

    if (posInt !== nextPos && posInt !== prevPos && posInt !== nowPos) {
      pos = posInt;
    }
  }

  return pos;
}

export { getPosElementDB }
