import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress, Modal, Stack } from '@mui/material'
import server from '../lib/axios'

const UserContext = createContext()
export function useUser() {
  return useContext(UserContext)
}

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [online, setOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await server.get(`/auth/check`, {
          headers: {
            Authorization: localStorage.getItem('password') || '',
          },
        })
        const data = response.data
        if (data.success) {
          server.defaults.headers.common['Authorization'] = data.password
          setIsLoggedIn(true)
          return
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [online])
  useEffect(() => {
    if (!navigator.onLine) {
      setOnline(false)
    }
    const onlineHandler = () => {
      setOnline(true)
    }
    const offLineHandler = () => {
      setOnline(false)
    }
    // If user being offline
    window.addEventListener('offline', offLineHandler)
    // If user back online after offline
    window.addEventListener('online', onlineHandler)
    return () => {
      window.addEventListener('offline', offLineHandler)
      window.addEventListener('online', onlineHandler)
    }
  }, [])

  function logOut() {
    server.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('password')
    setIsLoggedIn(false)
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, online, logOut }}>
      {isLoading ? (
        <Modal
          open={true}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none !important',
            outline: 'none !important',
          }}
        >
          <Stack
            border={'none'}
            sx={{ outline: 'none' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            <Box
              maxWidth={'200px'}
              component={'img'}
              sx={{
                animation: 'infinite fade 1s',
                '@keyframes fade': {
                  from: {
                    opacity: 0,
                  },
                  to: {
                    opacity: 1,
                  },
                },
              }}
              src='/logo-transparent.png'
            />
            <CircularProgress />
          </Stack>
        </Modal>
      ) : (
        children
      )}
    </UserContext.Provider>
  )
}

export default UserContextProvider

UserContextProvider.propTypes = {
  children: PropTypes.any,
}
