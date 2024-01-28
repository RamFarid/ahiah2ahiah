import fixedNumber from './fixedNumber'

function formatTime(duration) {
  return `${Math.floor(duration / 60)}:${fixedNumber(
    Math.floor(duration % 60)
  )}`
}

export default formatTime
