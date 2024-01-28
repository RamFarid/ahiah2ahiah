import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import fixedTime from '../../utils/fixedTime'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
function StepperDay({ list }) {
  const { day } = useParams()
  const [step, setStep] = useState(-1)
  useEffect(() => {
    let interval
    const getIndexInterval = () => {
      const now = new Date()
      const time = now.getHours() + now.getMinutes() / 60
      for (let i = 0; i < list.length; i++) {
        const current = list[i]
        const fromTime = current?.from?.split(':')
        const formHour = Number(fromTime[0]) + Number(fromTime[1] / 60)
        const toTime = current?.to?.split(':')
        const toHour = Number(toTime[0]) + Number(toTime[1] / 60)
        if ((time > formHour && time < toHour) || time === formHour) {
          console.log('GETINDEX COND.')
          setStep(i)
          break
        } else {
          setStep(-1)
        }
      }
    }
    ;(() => {
      const now = new Date()
      if (now.getDate() < 1 || now.getDate() > 3) return setStep(-1)
      if (now.getDate() === 1 && day !== 'الخميس') return setStep(-1)
      if (now.getDate() === 2 && day !== 'الجمعه') {
        if (day === 'الخميس') return setStep(99)
        return setStep(-1)
      }
      if (now.getDate() === 3 && day !== 'السبت') return setStep(99)
      interval = setInterval(getIndexInterval, 1000)
    })()

    return () => (interval ? clearInterval(interval) : undefined)
  }, [list, day])
  return (
    <Box
      sx={{
        direction: 'ltr',
        margin: 'auto',
        maxWidth: 400,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stepper activeStep={step} orientation='vertical'>
        {list.map((day) => (
          <Step key={day.topic}>
            <StepLabel
              optional={
                <Typography variant='caption' dir='rtl'>
                  {fixedTime(day.from)} - {fixedTime(day.to)}
                </Typography>
              }
            >
              {day.topic}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

StepperDay.propTypes = {
  list: PropTypes.array,
}

export default StepperDay
