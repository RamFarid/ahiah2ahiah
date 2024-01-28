import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import { useCallback, useState } from 'react'
import Drawer from './Drawer/Drawer'
import SignalCellularConnectedNoInternet4BarRoundedIcon from '@mui/icons-material/SignalCellularConnectedNoInternet4BarRounded'
import SignalCellular4BarRoundedIcon from '@mui/icons-material/SignalCellular4BarRounded'
import { useTheme } from '../Contexts/ThemeContext'

function Header() {
  const { isLoggedIn, online } = useUser()
  const [theme] = useTheme()
  const [isDrawer, setIsDrawer] = useState(false)
  const openDrawer = useCallback(() => setIsDrawer(true), [])
  const closeDrawer = useCallback(() => setIsDrawer(false), [])
  return (
    <>
      <AppBar position='sticky' sx={{ top: 0 }}>
        <Toolbar>
          <Stack
            alignItems={'center'}
            direction={'row'}
            color={'#fff'}
            flex={1}
            gap={2}
          >
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              direction={'row'}
              component={NavLink}
              to='/'
              sx={{
                textDecoration: 'none',
              }}
            >
              <Typography
                component={'h1'}
                variant='h4'
                sx={(t) => ({
                  color: t.palette.primary.main,
                  textShadow: `0px 0px 6px ${t.palette.primary.main}`,
                })}
              >
                أحيا 2 AHYAH
              </Typography>
              {/* <Box
                width={'76px'}
                height={'76px'}
                component={'img'}
                src={'/ahya2.png'}
              /> */}
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'}>
              {online ? (
                <SignalCellular4BarRoundedIcon color='success' />
              ) : (
                <SignalCellularConnectedNoInternet4BarRoundedIcon color='error' />
              )}
              <Typography
                color={online ? 'success' : 'error'}
                variant='caption'
              >
                {online ? 'متصل' : 'غير متصل'}
              </Typography>
            </Stack>
          </Stack>
          <Button
            component={NavLink}
            // variant='contained'
            to={
              window.location.pathname.slice(1) === 'score'
                ? `/login?next=${window.location.pathname.slice(1)}`
                : '/login'
            }
            sx={{
              mx: 1.3,
              fontWeight: 900,
              color: theme === 'dark' ? 'primary' : '#fff',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-disabled': {
                bgcolor: '#ffffffa6',
                color: 'primary',
              },
            }}
            disabled={isLoggedIn}
          >
            {isLoggedIn ? 'انت فعلا خادم' : 'خادم؟'}
          </Button>
          <IconButton onClick={openDrawer} color='inherit'>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer isDrawer={isDrawer} closeDrawer={closeDrawer} />
      {/* <BottomNavigation value={isDrawer} setValue={openDrawer} /> */}
    </>
  )
}

export default Header
