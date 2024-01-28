import React, { createContext, useContext, useEffect, useState } from 'react'

const TimeContext = createContext()

export const useTime = () => {
  return useContext(TimeContext)
}

function TimeContextProvider({ children }) {
  const [time, setTime] = useState({
    hour:
      new Date().getHours() > 12
        ? new Date().getHours() - 12
        : new Date().getHours(),
  })
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const currentHour = new Date().getHours()
      const isNight = currentHour > 12
      const hour = isNight ? currentHour - 12 : currentHour
      const dayStatus = isNight ? 'PM' : 'AM'
      setTime({
        hour,
        dayStatus,
      })
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [])
  return (
    <TimeContext.Provider value={[time, setTime]}>
      {children}
    </TimeContext.Provider>
  )
}

export default TimeContextProvider
