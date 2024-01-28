function fixedNumber(num) {
  return Number(num) >= 10 ? `${num}` : `0${num}`
}

export default fixedNumber
