function fixedTime(time) {
  const timeArray = time?.split(':')
  if (timeArray?.length === 2) {
    const hourExact = Number(timeArray[0]) + Number(timeArray[1] / 60)
    const hour =
      Math.floor(hourExact) === 12
        ? 12
        : hourExact > 12
        ? Math.floor(hourExact - 12)
        : Math.floor(hourExact)
    const minute = Number(timeArray[1])
    const interval = hourExact > 12 ? 'PM' : 'AM'
    return `${hour === 0 ? 12 : hour < 10 ? '0' + hour : hour}:${
      minute < 10 ? '0' + minute : minute
    }${interval}`
  }
  return time
}

export default fixedTime
