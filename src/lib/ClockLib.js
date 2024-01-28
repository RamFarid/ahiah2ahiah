import fixedNumber from '../utils/fixedNumber'

// [
//   {
//     startAngle: adjustAngle(getHourDegree(12)),
//     endAngle: adjustAngle(getHourDegree(4)),
//     color: 'red',
//   },
// ]

export function extractClockArrays(acts = []) {
  const nightHands = []
  const dayHands = []
  const dayActivities = []
  const nightActivities = []
  const dayAreas = []
  const nightAreas = []
  acts.forEach((activity) => {
    const dayStatusFrom = activity.from > 12 ? 'PM' : 'AM'
    const dayStatusTo = activity.to > 12 ? 'PM' : 'AM'
    if (dayStatusFrom === 'AM') {
      dayAreas.push({
        startAngle: {
          angle: adjustAngle(getHourDegree(activity.from)),
          dayStatus: dayStatusFrom,
        },
        endAngle: {
          angle: adjustAngle(getHourDegree(activity.to)),
          dayStatus: dayStatusTo,
        },
        color: generateRandomColor(),
      })
      dayHands.push({
        index: getHourDegree(activity.from),
        text: fixedNumber(activity.from),
        dayStatus: dayStatusFrom,
      })
      dayActivities.push({
        index: (getHourDegree(activity.to) + getHourDegree(activity.from)) / 2,
        text: activity.title,
      })
    } else {
      nightAreas.push({
        startAngle: {
          angle: adjustAngle(getHourDegree(activity.from)),
          dayStatus: dayStatusFrom,
        },
        endAngle: {
          angle: adjustAngle(getHourDegree(activity.to)),
          dayStatus: dayStatusTo,
        },
        color: generateRandomColor(),
      })
      nightHands.push({
        index: getHourDegree(activity.to),
        text: fixedNumber(activity.to),
        dayStatus: dayStatusTo,
      })
      nightActivities.push({
        index: (getHourDegree(activity.to) + getHourDegree(activity.from)) / 2,
        text: activity.title,
      })
    }
  })
  return {
    nightActivities,
    dayActivities,
    nightHands,
    dayHands,
    dayAreas,
    nightAreas,
  }
}

export function drawOccupiedAreas(
  ctx,
  occupiedAreas,
  centerX,
  centerY,
  radius
) {
  for (const area of occupiedAreas) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, area.startAngle, area.endAngle)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = area.color
    ctx.fill()
  }
}

export function getHourDegree(hour = 1) {
  const modifiedHour = hour >= 12 ? hour - 12 : hour
  return modifiedHour * 30
}

export function adjustAngle(degree = 0) {
  return Math.PI * ((-90 + degree) / 180)
}

export function generateRandomColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  const opacity = 0.2 // 50% opacity

  // Convert the decimal values to hexadecimal and pad with zeros if needed
  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')

  // Convert the opacity to hexadecimal
  const opacityHex = Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')

  // Combine the values to form the Hex color string
  const color = `#${redHex}${greenHex}${blueHex}${opacityHex}`

  return color
}

// const combineActs = (array = []) => {}

// const checkConsecutiveInsultion = (index, array) => {
//   let number = 0
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === index && array[i - 1] === index) {
//       number += 1
//     }
//   }
//   return number || false
// }

export const timeCircular = [
  '12:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
]

// if (repeation && acts[i - 1] !== act) {
//   if (i === 0)
//     clockArray.push({
//       type: 'hand',
//       index: 0,
//     })
//   lastIndex += repeation * 30
//   const halfStep = (30 * repeation) / 2
//   clockArray.push({
//     block: repeation,
//     index: lastIndex - halfStep,
//     text: act,
//     type: 'act',
//   })
//   if (i !== acts.length - 1)
//     clockArray.push({
//       type: 'hand',
//       index: lastIndex,
//     })
// }

//  const firstHourDeg = act.from === 12 && act.from > act.to ? 0 : act.from * 30
//  const secondHourDeg = act.to === 12 && act.from > act.to ? 0 : act.to * 30
//  singleHandActs.push({
//    type: 'hand',
//    deg: firstHourDeg,
//    text: `${fixedNumber(act.from)}:00`,
//  })
//  singleHandActs.push({
//    block: act.from > act.to ? act.from - act.to : act.to - act.from,
//    deg: (firstHourDeg + secondHourDeg) / 2,
//    text: act.title,
//    from: firstHourDeg,
//    to: secondHourDeg,
//    type: 'act',
//  })
//  singleHandActs.push({
//    type: 'hand',
//    deg: secondHourDeg,
//    text: `${fixedNumber(act.to)}:00`,
//  })

// ClockHand {index: 30deg, type: "hand"}
// ClockActivity {block: 2, index: 45deg, text: "البسين", type: "act"}
// ClockHand {index: 60deg, type: "hand"}
