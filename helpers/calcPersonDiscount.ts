function calcPersonDiscount(discountRules, { fixDiscount, accumulated }) {
  let result = {
    nowDiscount: 0,
    nextDiscount: 0,
    leftAccumulate: 0
  }

  if (fixDiscount > 0) {
    result.nowDiscount = fixDiscount;
    return result;
  }

  if (!discountRules.length) {
    return result;
  }

  const findInterestIndex = discountRules.findIndex((interest: any) => interest.summa > accumulated);

  if (findInterestIndex > -1) {
    const { percent, summa } = discountRules[findInterestIndex];

    if (findInterestIndex) {
      result.nowDiscount = discountRules[findInterestIndex - 1].percent;
    }
    result.nextDiscount = percent;
    result.leftAccumulate = summa - accumulated;
  }
  else {
    result.nowDiscount = discountRules[discountRules.length - 1].percent;
  }

  return result;
}

export { calcPersonDiscount }
