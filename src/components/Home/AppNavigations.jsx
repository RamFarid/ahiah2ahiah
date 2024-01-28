import { Stack } from '@mui/material'
import NavigationCard from './NavigationCard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import AccessAlarm from '@mui/icons-material/AccessAlarm'

function AppNavigations() {
  const currentDay = new Date().getDate()
  const linkDay =
    currentDay === 2 ? 'الجمعه' : currentDay === 3 ? 'السبت' : 'الخميس'
  return (
    <Stack
      justifyContent={'center'}
      flexDirection={'row'}
      flexWrap={'wrap'}
      gap={1.4}
    >
      <NavigationCard to={'/motto'} title={'الشعار'} icon={<EventNoteIcon />} />
      <NavigationCard
        to={'/score'}
        title={'الترتيب'}
        icon={<SportsScoreIcon />}
      />
      <NavigationCard
        icon={<AccessAlarm />}
        title={'البرنامج'}
        to={`/day/${linkDay}`}
      />
    </Stack>
  )
}

export default AppNavigations
