import { Stack } from '@mui/material'
import NavigationCard from './NavigationCard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SportsScoreIcon from '@mui/icons-material/SportsScore'
import AccessAlarm from '@mui/icons-material/AccessAlarm'
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone'
import Dashboard from '@mui/icons-material/Dashboard'
import QrCode2TwoTone from '@mui/icons-material/QrCode2TwoTone'
import { useUser } from '../../Contexts/UserContext'

function AppNavigations() {
  const { isLoggedIn } = useUser()
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
        icon={<AccessAlarm />}
        title={'البرنامج'}
        to={`/day/${linkDay}`}
      />
      <NavigationCard
        icon={<QuizTwoToneIcon />}
        title={'المسابقة'}
        to={`/quiz`}
      />
      {isLoggedIn && (
        <>
          <NavigationCard
            to={'/score'}
            title={'الترتيب'}
            icon={<SportsScoreIcon />}
            color={'error'}
          />
          <NavigationCard
            icon={<Dashboard />}
            title={'داش بورد'}
            to={`/dashboard`}
            color={'error'}
          />
          <NavigationCard
            icon={<QrCode2TwoTone />}
            title={'Scanner'}
            to={`/qrcode`}
            color={'error'}
          />
        </>
      )}
    </Stack>
  )
}

export default AppNavigations
