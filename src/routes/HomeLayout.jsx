import { Container } from '@mui/material'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import TimeContextProvider from '../Contexts/TimeContext'
import SpeedDial from '../components/SpeedDial/SpeedDial'

function HomeLayout() {
  return (
    <>
      <Header />
      <Container
        component={'main'}
        maxWidth='xs'
        sx={{
          my: 2,
          // There is a cringe bug here!
          // '&::before': {
          //   content: "''",
          //   position: 'fixed',
          //   inset: 0,
          //   zIndex: -1,
          //   backdropFilter: 'blur(2px)',
          // },
        }}
      >
        <TimeContextProvider>
          <Outlet />
        </TimeContextProvider>
      </Container>
      <SpeedDial />
    </>
  )
}

export default HomeLayout
