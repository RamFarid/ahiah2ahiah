import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import { useCallback, useState } from 'react'
import Drawer from './Drawer/Drawer'
import { useTheme } from '../Contexts/ThemeContext'

function Header() {
  const { isLoggedIn } = useUser()
  const [theme] = useTheme()
  const [isDrawer, setIsDrawer] = useState(false)
  const openDrawer = useCallback(() => setIsDrawer(true), [])
  const closeDrawer = useCallback(() => setIsDrawer(false), [])
  return (
    <>
      <AppBar
        position='sticky'
        sx={{ top: 0, bgcolor: (t) => t.mixins.toolbar.backgroundColor }}
      >
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
              <Box
                height={'76px'}
                component={'img'}
                src={
                  theme === 'dark'
                    ? '/logo-transparent.png'
                    : '/logo-transparent.svg'
                }
              />
            </Stack>
          </Stack>
          <Button
            component={NavLink}
            // variant='contained'
            to={`/login?next=${window.location.pathname.slice(1)}`}
            sx={(t) => ({
              mx: 1.3,
              fontWeight: 900,
              color: t.palette.mode === 'dark' ? 'primary' : '#fff',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-disabled': {
                bgcolor: '#ffffffa6',
                color: 'primary',
              },
            })}
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
