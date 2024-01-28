export default function minimalString(text = '') {
  return text
    .split(' ')
    .reduce((sum, current) => {
      if (current.length === 0) return sum
      return sum + current[0]
    }, '')
    .toUpperCase()
}
