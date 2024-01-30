function getRelativeTime(publishedTime) {
  const now = new Date()
  const published = new Date(publishedTime)

  // Time difference in milliseconds
  const timeDifference = now - published

  // Time constants
  const oneMinute = 60 * 1000
  const oneHour = 60 * oneMinute
  const oneDay = 24 * oneHour
  const oneWeek = 7 * oneDay

  // If within the same week
  if (timeDifference < oneWeek) {
    if (timeDifference < oneDay) {
      if (timeDifference < oneHour) {
        if (timeDifference < oneMinute) {
          return 'Just now'
        }
        const minutesAgo = Math.floor(timeDifference / oneMinute)
        return `منذ ${minutesAgo} دقيقة`
      }
      const hoursAgo = Math.floor(timeDifference / oneHour)
      const minutesLeft = Math.floor((timeDifference % oneHour) / oneMinute)
      return `منذ ${hoursAgo} ساعة و ${minutesLeft} دقيقة`
    }
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    if (timeDifference < 2 * oneDay) {
      return `أمس at ${published.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    }
    return `${daysOfWeek[published.getDay()]} في ${published.toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )}`
  }

  // If more than a week
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (now.getFullYear() !== published.getFullYear())
    return `${published.getDate()} ${
      monthNames[published.getMonth()]
    } ${published.getFullYear()} في ${published.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`

  return `${published.getDate()} ${
    monthNames[published.getMonth()]
  } في ${published.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

export default getRelativeTime
