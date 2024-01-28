import Stack from '@mui/material/Stack'
import AppReason from '../components/Home/AppReason'
import AppUsage from '../components/Home/AppUsage'
import AppContents from '../components/Home/AppContents'
import { Divider } from '@mui/material'
import AppNotes from '../components/Home/AppNotes'
import AppNavigations from '../components/Home/AppNavigations'

function Home() {
  return (
    <Stack gap={3}>
      <AppNavigations />
      <Divider />
      <AppReason />
      <Divider />
      <AppContents />
      <Divider />
      <AppUsage />
      <Divider />
      <AppNotes />
    </Stack>
  )
}

export default Home
